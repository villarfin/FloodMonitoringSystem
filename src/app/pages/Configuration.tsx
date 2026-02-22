import { Link } from "react-router-dom";

export function Configuration() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Flood Monitoring System</h1>
        <p className="app__subtitle">Real-time water level monitoring and alerts</p>
      </header>

      <main className="app__main">
        <h2>Configuration</h2>
        <p>This screen would allow changing system settings.</p>
        <Link to="/summary">
          <button>Back to Summary</button>
        </Link>
      </main>

      <footer className="app__footer">
        Flood Monitoring System - Laboratory Activity #3
      </footer>
    </div>
  );
}
