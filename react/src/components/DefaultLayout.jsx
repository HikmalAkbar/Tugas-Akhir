import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        {user.role !== "user" && <Link to="/elections">Elections</Link>}
        {user.role !== "user" && <Link to="/candidates">Candidates</Link>}
        {user.role !== "user" && <Link to="/polls">Polls</Link>}
        {user.role !== "user" && <Link to="/votes">Votes</Link>}
        {user.role !== "user" && <Link to="/voters">Voters</Link>}
        {user.role === "superadmin" && <Link to="/users">Users</Link>}
        <Link to={'/users/' + user.id}>User Profile</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>

          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
            {/* <Link className="btn-edit" to={'/users/' + user.id}>Edit</Link> */}
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
