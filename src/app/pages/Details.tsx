import { Link } from "react-router-dom";

export function Details() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Flood Monitoring System</h1>
        <p className="app__subtitle">Real-time water level monitoring and alerts</p>
      </header>

      <main className="app__main">
        <h2>Details</h2>
        <p>This screen would show detailed information about a selected location or alert.</p>
        <Link to="/dashboard">
          <button>Back to Dashboard</button>
        </Link>
      </main>

      <footer className="app__footer">
        Flood Monitoring System - Laboratory Activity #3
      </footer>
    </div>
  );
}
