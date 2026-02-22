import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-brand">Flood Monitoring System</div>
      <div className="app__navbar-menu">
        <button
          className="app__navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        {menuOpen && (
          <div className="app__navbar-dropdown">
            <Link
              to="/dashboard"
              className={location.pathname === "/dashboard" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/admin"
              className={location.pathname.startsWith("/admin") ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
            <Link
              to="/summary"
              className={location.pathname === "/summary" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Summary
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
