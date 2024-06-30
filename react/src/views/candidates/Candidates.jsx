import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification, user} = useStateContext()

  useEffect(() => {
    getCandidates();
  }, [])

  const onDeleteClick = candidate => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) {
      return
    }
    axiosClient.delete(`/candidates/${candidate.id}`)
      .then(() => {
        setNotification('Candidate was successfully deleted')
        getCandidates()
      })
  }

  const getCandidates = () => {
    setLoading(true)
    axiosClient.get('/candidates')
      .then(({ data }) => {
        setLoading(false)
        setCandidates(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Candidates</h1>
        <Link className="btn-add" to="/candidates/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>User_ID</th>
            {/* <th>Election_ID</th> */}
            <th>Name</th>
            <th>Party</th>
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
            {candidates.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.user_id}</td>
                {/* <td>{u.election_id}</td> */}
                <td>{u.name}</td>
                <td>{u.party}</td>
                <td>
                    {user.id === u.user_id && ( // Only show edit and delete buttons for the owner
                        <>
                        <Link className="btn-edit" to={'/candidates/' + u.id}>Edit</Link>
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
