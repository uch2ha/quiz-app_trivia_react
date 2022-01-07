import { Link } from "react-router-dom";


const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="links">
        <Link to="/" style={{
          color: 'white',
          backgroundColor: 'transparent',
          borderRadius: '8px',
          fontSize: "22px",
          border: "3px solid #7428d1",
          padding: "10px"
        }}>Questions</Link>

        <Link to="/favorites" style={{
          color: 'white',
          backgroundColor: 'transparent',
          borderRadius: '8px',
          fontSize: "22px",
          border: "3px solid #7428d1",
          padding: "10px",
          marginLeft: "1.5rem"
        }}>Favorites</Link>

      </div>
    </nav>
  );
}

export default Navbar;