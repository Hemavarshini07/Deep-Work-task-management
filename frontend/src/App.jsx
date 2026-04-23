import React, { useState, useEffect } from 'react';
import { sessionService } from './api';
import toast, { Toaster } from 'react-hot-toast';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function App() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionGoal, setNewSessionGoal] = useState('');
  const [newSessionDuration, setNewSessionDuration] = useState(60);
  const [pauseReason, setPauseReason] = useState('');
  const [showPauseInput, setShowPauseInput] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    fetchHistory();
    
    const ws = new WebSocket('ws://localhost:8000/ws');
    ws.onmessage = (event) => {
      if (event.data === 'session_updated') {
        fetchHistory();
      }
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    let interval = null;
    if (activeSession && activeSession.status === 'active' && activeSession.start_time) {
      const calculateTimeLeft = () => {
        const startTimeStr = activeSession.start_time.endsWith('Z') ? activeSession.start_time : activeSession.start_time + 'Z';
        const start = new Date(startTimeStr).getTime();
        const durationMs = activeSession.scheduled_duration * 60 * 1000;
        const now = new Date().getTime();
        const diff = Math.max(0, Math.floor((start + durationMs - now) / 1000));
        
        if (diff === 0 && timeLeft > 0) {
          toast.error("You are overdue ⚠️", { id: 'overdue-toast' });
        }
        
        setTimeLeft(diff);
      };

      calculateTimeLeft();
      interval = setInterval(calculateTimeLeft, 1000);
    } else {
      setTimeLeft(null);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  const formatTime = (seconds) => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const fetchHistory = async () => {
    try {
      const response = await sessionService.getHistory();
      setSessions(response.data);
      const current = response.data.find(s => s.status === 'active' || s.status === 'paused');
      setActiveSession(current);
    } catch (error) {
      console.error("Failed to fetch history", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await sessionService.createSession({ 
        name: newSessionTitle, 
        goal: newSessionGoal,
        scheduled_duration: parseInt(newSessionDuration)
      });
      setNewSessionTitle('');
      setNewSessionGoal('');
      setNewSessionGoal('');
      fetchHistory();
      toast.success("Session scheduled!");
    } catch (error) {
      toast.error("Failed to create session");
    }
  };

  const handleStart = async (id) => {
    try {
      const res = await sessionService.startSession(id);
      setActiveSession(res.data);
      fetchHistory();
      toast.success("Focus session started! 🚀");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to start");
    }
  };

  const handlePause = async () => {
    if (!pauseReason) {
      setShowPauseInput(true);
      return;
    }
    try {
      const res = await sessionService.pauseSession(activeSession.id, pauseReason);
      setActiveSession(res.data);
      setPauseReason('');
      setShowPauseInput(false);
      fetchHistory();
      toast("Session paused ⏸️");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to pause");
    }
  };

  const handleResume = async () => {
    try {
      const res = await sessionService.resumeSession(activeSession.id);
      setActiveSession(res.data);
      fetchHistory();
      toast.success("Session resumed!");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to resume");
    }
  };

  const handleComplete = async () => {
    try {
      const res = await sessionService.completeSession(activeSession.id);
      setActiveSession(null);
      fetchHistory();
      toast.success(res.data.status === 'overdue' ? "Session completed (overdue) ⚠️" : "Session completed! ✅");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to complete");
    }
  };

  const completedSessions = sessions.filter(s => s.status === 'completed' || s.status === 'overdue');
  const interruptedSessions = sessions.filter(s => s.status === 'interrupted' || s.status === 'abandoned');
  const totalFocusTime = completedSessions.reduce((acc, s) => acc + s.scheduled_duration, 0);

  const pieData = [
    { name: 'Completed', value: completedSessions.length },
    { name: 'Interrupted', value: interruptedSessions.length },
  ];
  const COLORS = ['#10b981', '#ef4444'];

  const dailyStats = sessions.reduce((acc, s) => {
    if (!s.start_time) return acc;
    const date = new Date(s.start_time.endsWith('Z') ? s.start_time : s.start_time + 'Z').toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const duration = s.scheduled_duration;
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.minutes += duration;
    } else {
      acc.push({ date, minutes: duration });
    }
    return acc;
  }, []);

  return (
    <div className="container">
      <Toaster position="top-right" />
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Deep<span style={{ color: 'var(--primary)' }}>Work</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Optimize your productivity with session tracking.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <div className="glass-card">
            <h2 style={{ marginBottom: '1.5rem' }}>New Session</h2>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Task Name</label>
                <input
                  type="text"
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  placeholder="Deep coding session..."
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Session Goal</label>
                <input
                  type="text"
                  value={newSessionGoal}
                  onChange={(e) => setNewSessionGoal(e.target.value)}
                  placeholder="What do you want to achieve?"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Duration (minutes)</label>
                <input
                  type="number"
                  value={newSessionDuration}
                  onChange={(e) => setNewSessionDuration(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Create Session</button>
            </form>
          </div>

          {activeSession && (
            <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <h2 style={{ marginBottom: '0.2rem' }}>Active: {activeSession.name}</h2>
              {activeSession.goal && <p style={{ marginBottom: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>Goal: {activeSession.goal}</p>}
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Status: <span className={`badge status-${activeSession.status}`}>{activeSession.status}</span>
              </p>

              {activeSession.status === 'active' && (
                <div style={{ 
                  fontSize: '3rem', 
                  fontWeight: '700', 
                  fontFamily: 'monospace', 
                  textAlign: 'center', 
                  margin: '1.5rem 0',
                  color: timeLeft < 300 ? 'var(--danger)' : 'var(--primary)',
                  textShadow: '0 0 20px rgba(var(--primary-rgb), 0.3)'
                }}>
                  {formatTime(timeLeft)}
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {activeSession.status === 'scheduled' && (
                  <button className="btn btn-primary" onClick={() => handleStart(activeSession.id)}>Start Now</button>
                )}

                {activeSession.status === 'active' && (
                  <>
                    <button className="btn btn-outline" onClick={() => setShowPauseInput(true)}>Pause</button>
                    <button className="btn btn-primary" onClick={handleComplete}>Complete</button>
                  </>
                )}

                {activeSession.status === 'paused' && (
                  <button className="btn btn-primary" onClick={handleResume}>Resume</button>
                )}
              </div>

              {showPauseInput && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--glass)', borderRadius: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Reason for pause:</label>
                  <input
                    type="text"
                    value={pauseReason}
                    onChange={(e) => setPauseReason(e.target.value)}
                    placeholder="Brief reason..."
                  />
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-primary" onClick={handlePause}>Confirm Pause</button>
                    <button className="btn btn-outline" onClick={() => setShowPauseInput(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="glass-card">
          <h2 style={{ marginBottom: '1.5rem' }}>Session History</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Task / Goal</th>
                  <th>Duration</th>
                  <th>Interruptions</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: '500' }}>
                      {s.name}
                      {s.goal && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '400' }}>{s.goal}</div>}
                    </td>
                    <td>{s.scheduled_duration}m</td>
                    <td>{s.interruption_count}</td>
                    <td>
                      <span className={`badge status-${s.status}`}>{s.status}</span>
                    </td>
                    <td>
                      {s.status === 'scheduled' && !activeSession && (
                        <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleStart(s.id)}>Start</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Productivity Analytics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
          
          <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--glass)', borderRadius: '1rem' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Focus Time</h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {totalFocusTime} <span style={{ fontSize: '1.2rem' }}>min</span>
            </div>
          </div>

          <div style={{ height: 200 }}>
            <h3 style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1rem' }}>Completion Rate</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ height: 200 }}>
            <h3 style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1rem' }}>Daily Minutes</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyStats}>
                <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} contentStyle={{ background: 'var(--bg-dark)', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="minutes" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
