import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">godBOIS AI</h2>

      <nav className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/search">Search</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/monitoring">Monitoring</Link>
        <Link to="/competitors">Competitors</Link>
        <Link to="/reports">Reports</Link>
      </nav>
    </div>
  );
}

export default Sidebar;