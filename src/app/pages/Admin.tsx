import { Link } from "react-router-dom";

export function Admin() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Flood Monitoring System</h1>
        <p className="app__subtitle">Real-time water level monitoring and alerts</p>
      </header>

      <main className="app__main">
        <h2>Admin View</h2>
        <p>Administrative actions such as configuration or user management are accessible here.</p>
        <Link to="/admin/users">
          <button>User Management</button>
        </Link>
      </main>

      <footer className="app__footer">
        Flood Monitoring System - Laboratory Activity #3
      </footer>
    </div>
  );
}
