import { Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
// import './HomeLayout.css';

function HomeLayout() {
//   const { user, setUser } = useStateContext();
  const {user, token, setUser, setToken, notification} = useStateContext();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

//   useEffect(() => {
//     axiosClient.get('/user')
//       .then(({data}) => {
//          setUser(data)
//       })
//   }, [])

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="home-layout">
      <header>
        <nav className="navigation">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/online-elections">Online Elections</Link></li>
            <li><Link to="/semi-online-elections">Semi-Online Elections</Link></li>
          </ul>
          <div className="user-dropdown" onClick={toggleDropdown}>
            <img src={user?.image || 'user-placeholder.png'} alt="User" className="user-image" />
            <span>{user?.name}</span>
            {dropdownVisible && (
              <ul className="dropdown-menu">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={onLogout}>Logout</button></li>
              </ul>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
