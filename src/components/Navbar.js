import { Link } from "react-router-dom";


const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="links">
        <Link to="/" style={{
          color: '#f1356d',
          backgroundColor: 'white',
          borderRadius: '8px',
          fontSize: "20px",
          border: "2px solid #f1356d",
          padding: "10px"
        }}>Questions</Link>

        <Link to="/favorites" style={{
          color: '#f1356d',
          backgroundColor: 'white',
          borderRadius: '8px',
          fontSize: "20px",
          border: "2px solid #f1356d",
          padding: "10px"
        }}>Favorites</Link>

      </div>
    </nav>
  );
}

export default Navbar;