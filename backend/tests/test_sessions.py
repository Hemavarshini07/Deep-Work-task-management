import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.main import app
from backend.database import Base, get_db

engine = create_engine("sqlite:///./test_db.db", connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_create_session():
    r = client.post("/sessions/", json={"name": "Test", "scheduled_duration": 60})
    assert r.status_code == 200
    assert r.json()["status"] == "scheduled"

def test_start_session():
    s = client.post("/sessions/", json={"name": "Test", "scheduled_duration": 60}).json()
    r = client.patch(f"/sessions/{s['id']}/start")
    assert r.status_code == 200
    assert r.json()["status"] == "active"

def test_pause_and_resume():
    s = client.post("/sessions/", json={"name": "Test", "scheduled_duration": 60}).json()
    client.patch(f"/sessions/{s['id']}/start")
    r = client.patch(f"/sessions/{s['id']}/pause", json={"reason": "break"})
    assert r.json()["status"] == "paused"
    r = client.patch(f"/sessions/{s['id']}/resume")
    assert r.json()["status"] == "active"

def test_interrupted_after_4_pauses():
    s = client.post("/sessions/", json={"name": "Test", "scheduled_duration": 60}).json()
    client.patch(f"/sessions/{s['id']}/start")
    for i in range(3):
        client.patch(f"/sessions/{s['id']}/pause", json={"reason": f"pause {i}"})
        client.patch(f"/sessions/{s['id']}/resume")
    r = client.patch(f"/sessions/{s['id']}/pause", json={"reason": "4th pause"})
    assert r.json()["status"] == "interrupted"

def test_complete_session():
    s = client.post("/sessions/", json={"name": "Test", "scheduled_duration": 60}).json()
    client.patch(f"/sessions/{s['id']}/start")
    r = client.patch(f"/sessions/{s['id']}/complete")
    assert r.json()["status"] in ("completed", "overdue")

def test_session_history():
    r = client.get("/sessions/history")
    assert r.status_code == 200
    assert isinstance(r.json(), list)

def test_cannot_pause_scheduled_session():
    s = client.post("/sessions/", json={"name": "Test", "scheduled_duration": 60}).json()
    r = client.patch(f"/sessions/{s['id']}/pause", json={"reason": "invalid"})
    assert r.status_code == 400
