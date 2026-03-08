import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import "../styles/components/NavBar.css";

interface NavBarProps {
  onLogout: () => void;
}

export function NavBar({ onLogout }: NavBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
    navigate("/admin/login", { replace: true, state: { from: "/" } });
  };

  return (
    <nav className="app__nav-board" aria-label="Primary">
      <button
        type="button"
        className="app__nav-board-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span className="app__hamburger">
          <span />
          <span />
          <span />
        </span>
      </button>

      <section className={`app__nav-board-panel ${menuOpen ? "is-open" : ""}`}>
        <h2 className="app__nav-board-title">Navigation</h2>
        <ul className="app__nav-board-links">
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className={location.pathname.startsWith("/admin") ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          </li>
          <li>
            <Link
              to="/monitoring"
              className={location.pathname === "/monitoring" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Monitoring
            </Link>
          </li>
          <li>
            <Link
              to="/incident-report"
              className={location.pathname === "/incident-report" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Incident Report
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className={location.pathname === "/notifications" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/summary"
              className={location.pathname === "/summary" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Summary
            </Link>
          </li>
          <li>
            <button type="button" className="app__nav-board-logout" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        </ul>
      </section>
    </nav>
  );
}


