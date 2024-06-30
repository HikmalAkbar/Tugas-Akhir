import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Elections() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification, user} = useStateContext()

  useEffect(() => {
    getElections();
  }, [])

  const onDeleteClick = election => {
    if (!window.confirm("Are you sure you want to delete this election?")) {
      return
    }
    axiosClient.delete(`/elections/${election.id}`)
      .then(() => {
        setNotification('Election was successfully deleted')
        getElections()
      })
  }

  const getElections = () => {
    setLoading(true)
    axiosClient.get('/elections')
      .then(({ data }) => {
        setLoading(false)
        setElections(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Elections</h1>
        {(user.role === 'admin' || user.role === 'superadmin') && (
          <Link className="btn-add" to="/elections/new">Add new</Link>
        )}
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>User_id</th>
            <th>Name</th>
            <th>Location</th>
            <th>startDate</th>
            <th>endDate</th>
            {/* <th>startTime</th>
            <th>endTime</th> */}
            <th>Type</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {elections.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.user_id}</td>
                <td>{u.name}</td>
                <td>{u.location}</td>
                <td>{u.startDate}</td>
                <td>{u.endDate}</td>
                {/* <td>{u.startTime}</td>
                <td>{u.endTime}</td> */}
                <td>{u.type}</td>
                <td>
                    {(user.role === 'superadmin' || user.id === u.user_id) && (
                      <>
                        <Link className="btn-edit" to={'/elections/' + u.id}>Edit</Link>
                        &nbsp;
                        <button className="btn-delete" onClick={() => onDeleteClick(u)}>Delete</button>
                      </>
                    )}
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
