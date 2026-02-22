import { Link } from "react-router-dom";

export function Summary() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Flood Monitoring System</h1>
        <p className="app__subtitle">Real-time water level monitoring and alerts</p>
      </header>

      <main className="app__main">
        <h2>Summary View</h2>
        <p>A high‑level summary of system state could be shown here.</p>
        <Link to="/configuration">
          <button>Go to Configuration</button>
        </Link>
      </main>

      <footer className="app__footer">
        Flood Monitoring System - Laboratory Activity #3
      </footer>
    </div>
  );
}
