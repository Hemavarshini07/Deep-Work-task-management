from datetime import datetime
from sqlalchemy.orm import Session as DBSession
from backend import models, schemas

class SessionLogic:
    @staticmethod
    def start_session(db: DBSession, session: models.Session):
        if session.status != "scheduled":
            raise ValueError(f"Cannot start session in status: {session.status}")
        
        session.status = "active"
        session.start_time = datetime.utcnow()
        db.commit()
        db.refresh(session)
        return session

    @staticmethod
    def pause_session(db: DBSession, session: models.Session, reason: str):
        if session.status != "active":
            raise ValueError(f"Cannot pause session in status: {session.status}")
        
        interruption = models.Interruption(session_id=session.id, reason=reason)
        db.add(interruption)
        
        session.interruption_count += 1
        
        if session.interruption_count > 3:
            session.status = "interrupted"
            session.end_time = datetime.utcnow()
        else:
            session.status = "paused"
            
        db.commit()
        db.refresh(session)
        return session

    @staticmethod
    def resume_session(db: DBSession, session: models.Session):
        if session.status != "paused":
            raise ValueError(f"Cannot resume session in status: {session.status}")
        
        session.status = "active"
        db.commit()
        db.refresh(session)
        return session

    @staticmethod
    def complete_session(db: DBSession, session: models.Session):
        if session.status != "active":
            raise ValueError(f"Cannot complete session in status: {session.status}")
        
        session.end_time = datetime.utcnow()
        
        duration_minutes = (session.end_time - session.start_time).total_seconds() / 60
        if duration_minutes > session.scheduled_duration * 1.1:
            session.status = "overdue"
        else:
            session.status = "completed"
            
        db.commit()
        db.refresh(session)
        return session

    @staticmethod
    def check_abandoned(db: DBSession, session: models.Session):
        if session.status == "paused":
            last_interruption = db.query(models.Interruption).filter(models.Interruption.session_id == session.id).order_by(models.Interruption.pause_time.desc()).first()
            if last_interruption:
                pause_duration = (datetime.utcnow() - last_interruption.pause_time).total_seconds() / 3600
                if pause_duration > 2: # 2 hours
                    session.status = "abandoned"
                    db.commit()
                    db.refresh(session)
        return session
