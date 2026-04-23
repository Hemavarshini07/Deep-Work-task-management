from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, CheckConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database import Base

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    goal = Column(String, nullable=True)
    scheduled_duration = Column(Integer, nullable=False)
    start_time = Column(DateTime, nullable=True)
    end_time = Column(DateTime, nullable=True)
    status = Column(String, default="scheduled")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    __table_args__ = (
        CheckConstraint(status.in_(['scheduled', 'active', 'paused', 'completed', 'interrupted', 'abandoned', 'overdue']), name='status_check'),
    )
    
    interruption_count = Column(Integer, default=0)
    
    interruptions = relationship("Interruption", back_populates="session")

class Interruption(Base):
    __tablename__ = "interruptions"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id", ondelete="CASCADE"))
    reason = Column(String, nullable=False)
    pause_time = Column(DateTime, default=datetime.utcnow)

    session = relationship("Session", back_populates="interruptions")
