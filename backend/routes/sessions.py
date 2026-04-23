from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session as DBSession
from typing import List
from backend import models, schemas, database
from backend.services.session_logic import SessionLogic
from backend.websocket import manager

router = APIRouter(prefix="/sessions", tags=["sessions"])

@router.post("/", response_model=schemas.Session)
def create_session(session: schemas.SessionCreate, background_tasks: BackgroundTasks, db: DBSession = Depends(database.get_db)):
    db_session = models.Session(
        name=session.name, 
        goal=session.goal,
        scheduled_duration=session.scheduled_duration
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    background_tasks.add_task(manager.broadcast, "session_updated")
    return db_session

@router.get("/history", response_model=List[schemas.Session])
def get_sessions(db: DBSession = Depends(database.get_db)):
    sessions = db.query(models.Session).all()
    for session in sessions:
        SessionLogic.check_abandoned(db, session)
    return sessions

@router.patch("/{session_id}/start", response_model=schemas.Session)
def start_session(session_id: int, background_tasks: BackgroundTasks, db: DBSession = Depends(database.get_db)):
    db_session = db.query(models.Session).filter(models.Session.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    try:
        updated_session = SessionLogic.start_session(db, db_session)
        background_tasks.add_task(manager.broadcast, "session_updated")
        return updated_session
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{session_id}/pause", response_model=schemas.Session)
def pause_session(session_id: int, interruption: schemas.InterruptionCreate, background_tasks: BackgroundTasks, db: DBSession = Depends(database.get_db)):
    db_session = db.query(models.Session).filter(models.Session.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    try:
        updated_session = SessionLogic.pause_session(db, db_session, interruption.reason)
        background_tasks.add_task(manager.broadcast, "session_updated")
        return updated_session
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{session_id}/resume", response_model=schemas.Session)
def resume_session(session_id: int, background_tasks: BackgroundTasks, db: DBSession = Depends(database.get_db)):
    db_session = db.query(models.Session).filter(models.Session.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    try:
        updated_session = SessionLogic.resume_session(db, db_session)
        background_tasks.add_task(manager.broadcast, "session_updated")
        return updated_session
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{session_id}/complete", response_model=schemas.Session)
def complete_session(session_id: int, background_tasks: BackgroundTasks, db: DBSession = Depends(database.get_db)):
    db_session = db.query(models.Session).filter(models.Session.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    try:
        updated_session = SessionLogic.complete_session(db, db_session)
        background_tasks.add_task(manager.broadcast, "session_updated")
        return updated_session
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
