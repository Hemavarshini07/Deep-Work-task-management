from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class InterruptionBase(BaseModel):
    reason: str

class InterruptionCreate(InterruptionBase):
    pass

class Interruption(InterruptionBase):
    id: int
    session_id: int
    pause_time: datetime

    class Config:
        from_attributes = True

class SessionBase(BaseModel):
    name: str
    goal: Optional[str] = None
    scheduled_duration: int

class SessionCreate(SessionBase):
    pass

class SessionUpdate(BaseModel):
    status: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class Session(SessionBase):
    id: int
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    status: str
    interruption_count: int
    created_at: datetime
    interruptions: List[Interruption] = []

    class Config:
        from_attributes = True
