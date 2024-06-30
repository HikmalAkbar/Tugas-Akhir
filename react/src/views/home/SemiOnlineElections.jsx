import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Election Portal</h1>
      <p>Select an election type to get started:</p>
      <div className="card-grid">
        <Link to="/online-elections" className="card">
          <h2>Online Elections</h2>
        </Link>
        <Link to="/semi-online-elections" className="card">
          <h2>Semi-Online Elections</h2>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
