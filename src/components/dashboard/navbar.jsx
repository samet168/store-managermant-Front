import '../../style/GlobalDashboard.css';

const Navbar = () => {
  return (
    <nav className="navbarD">
      <div className="navbar-container">

        <div className="navbar-logo">
          Apex Dashboard
        </div>

        <ul className="navbar-menu">
          <li><a className="nav-link active" href="#">Dashboard</a></li>
          <li><a className="nav-link" href="#">Analytics</a></li>
          <li><a className="nav-link" href="#">Reports</a></li>
          <li><a className="nav-link" href="#">Settings</a></li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;