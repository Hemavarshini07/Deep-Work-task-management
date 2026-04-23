
INSERT INTO sessions (name, goal, scheduled_duration, status, interruption_count, start_time, end_time) VALUES 
('Finish Implementation Plan', 'Complete the plan for the technical challenge', 60, 'completed', 0, '2026-04-21 08:00:00', '2026-04-21 08:55:00'),
('Backend Bug Fixes', 'Fix the missing goal field and constraints', 45, 'interrupted', 4, '2026-04-21 09:00:00', '2026-04-21 09:30:00'),
('Frontend Polishing', 'Improve aesthetics and glassmorphism', 120, 'overdue', 2, '2026-04-21 10:00:00', '2026-04-21 12:30:00'),
('Deepwork on UI Components', 'Build the timer and history view', 90, 'active', 0, '2026-04-21 10:30:00', NULL),
('Future Session', 'Scheduled for later today', 30, 'scheduled', 0, NULL, NULL);

INSERT INTO interruptions (session_id, reason, pause_time) VALUES 
(2, 'Phone call from recruiter', '2026-04-21 09:05:00'),
(2, 'Slack notification distraction', '2026-04-21 09:15:00'),
(2, 'Coffee break', '2026-04-21 09:20:00'),
(2, 'Internet outage', '2026-04-21 09:25:00');

INSERT INTO interruptions (session_id, reason, pause_time) VALUES 
(3, 'Quick snack', '2026-04-21 11:00:00'),
(3, 'Housemate talk', '2026-04-21 11:30:00');
