# Deep Work Session Tracker   

A full-stack task management system designed to help users plan, execute, and analyze deep work sessions. The application enforces a strict state machine for session statuses (scheduled, active, paused, interrupted, completed, overdue, abandoned) and features real-time synchronization, interactive notifications, and a productivity analytics dashboard.

## Tech Stack
- **Backend**: FastAPI (Python), SQLite, SQLAlchemy, Alembic
- **Frontend**: React (Vite), Axios, Recharts, React-Hot-Toast
- **Real-Time**: FastAPI WebSockets
- **SDK**: Auto-generated Python Client via OpenAPI Generator

## Advanced Features
- **Real-Time Cross-Tab Syncing**: Powered by WebSockets, any state change in one window instantly reflects across all connected clients.
- **Smart Status Detection**: Automatically marks sessions as `interrupted` (after 4 pauses), `overdue` (exceeding 110% of scheduled time), or `abandoned` (paused for > 2 hours).
- **Productivity Analytics**: A dynamic dashboard utilizing Recharts to display Total Focus Time, Completion Rates (Pie Chart), and Daily Focus Minutes (Bar Chart).
- **Interactive UI**: Glassmorphism design system with responsive layouts and real-time countdown timers.

## Prerequisites
- Python 3.10+
- Node.js & npm
- Java (Required only if you wish to manually regenerate the OpenAPI SDK)

## Installation & Setup

1. **Environment Setup & Database Migration**
   Run the setup script from the root directory to create the virtual environment, install backend dependencies, install frontend dependencies, and run database migrations.
   ```bash
   setupdev.bat
   ```

2. **Run the Application**
   Run the application script. This will start the FastAPI backend on port 8000 and the React frontend in a separate terminal.
   ```bash
   runapplication.bat
   ```
   *Frontend usually runs on `http://localhost:5173`. Backend API runs on `http://localhost:8000`.*

3. **API Documentation**
   Once the backend is running, you can access the interactive OpenAPI documentation:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## Running Tests
Backend unit tests cover the core API routes and the hidden state machine logic.
```bash
.\env\Scripts\pytest backend/tests/test_sessions.py
```
*(If on Linux/Mac, use `source env/bin/activate` and run `pytest backend/tests/test_sessions.py`)*

## Python SDK
The project includes a fully generated Python SDK located in the `deepwork_sdk/` directory. If you modify the backend API and need to regenerate the SDK, use:
```bash
generate_sdk.bat
```
