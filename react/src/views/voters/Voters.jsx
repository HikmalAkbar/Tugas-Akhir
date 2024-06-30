import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Voters() {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification, user} = useStateContext()

  useEffect(() => {
    getVoters();
  }, [])

  const onDeleteClick = voter => {
    if (!window.confirm("Are you sure you want to delete this voter?")) {
      return
    }
    axiosClient.delete(`/voters/${voter.id}`)
      .then(() => {
        setNotification('Voter was successfully deleted')
        getVoters()
      })
  }

  const getVoters = () => {
    setLoading(true)
    axiosClient.get('/voters')
      .then(({ data }) => {
        setLoading(false)
        setVoters(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Voters</h1>
        <Link className="btn-add" to="/voters/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>User_ID</th>
            <th>Name</th>
            <th>NIK</th>
            <th>Address</th>
            <th>Token</th>
            <th>Is_used</th>
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
            {voters.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.user_id}</td>
                <td>{u.name}</td>
                <td>{u.nik}</td>
                <td>{u.address}</td>
                <td>{u.token}</td>
                <td>{u.is_used}</td>
                <td>
                    {user.id === u.user_id && ( // Only show edit and delete buttons for the owner
                        <>
                        <Link className="btn-edit" to={'/voters/' + u.id}>Edit</Link>
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
