import { Link } from "react-router";
import "../styles/pages/Admin.css";

export function Admin() {
  return (
    <section className="app__section">
      <h2 className="app__section-title">Admin View</h2>
      <p className="app__page-text">
        Administrative actions such as configuration or user management are
        accessible here.
      </p>
      <section className="app__graph-placeholder">
        <h3>IoT Alert History Graph (Prototype)</h3>
        <p className="app__page-text">
          This section is reserved for past tsunami/flood alert records from the IoT device.
        </p>
      </section>
      <nav className="app__page-actions" aria-label="Admin actions">
        <Link to="/admin/users" className="app__page-link">
          User Management
        </Link>
      </nav>
    </section>
  );
}


