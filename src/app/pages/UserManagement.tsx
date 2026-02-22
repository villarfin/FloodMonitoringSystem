import { Link } from "react-router-dom";

export function UserManagement() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Flood Monitoring System</h1>
        <p className="app__subtitle">Real-time water level monitoring and alerts</p>
      </header>

      <main className="app__main">
        <h2>User Management</h2>
        <p>Here an admin could add, remove or modify users in the system.</p>
        <Link to="/admin">
          <button>Back to Admin</button>
        </Link>
      </main>

      <footer className="app__footer">
        Flood Monitoring System - Laboratory Activity #3
      </footer>
    </div>
  );
}
