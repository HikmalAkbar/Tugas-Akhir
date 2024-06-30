import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Votes() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification, user} = useStateContext()

  useEffect(() => {
    getVotes();
  }, [])

  const onDeleteClick = vote => {
    if (!window.confirm("Are you sure you want to delete this vote?")) {
      return
    }
    axiosClient.delete(`/votes/${vote.id}`)
      .then(() => {
        setNotification('Vote was successfully deleted')
        getVotes()
      })
  }

  const getVotes = () => {
    setLoading(true)
    axiosClient.get('/votes')
      .then(({ data }) => {
        setLoading(false)
        setVotes(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Votes</h1>
        {/* <Link className="btn-add" to="/votes/new">Add new</Link> */}
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>User_ID</th>
            <th>Election_ID</th>
            <th>Candidate_ID</th>
            <th>Voter_ID</th>
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
            {votes.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.user_id}</td>
                <td>{u.election_id}</td>
                <td>{u.candidate_id}</td>
                <td>{u.voter_id}</td>
                <td>
                    {/* {user.id === u.user_id && ( // Only show edit and delete buttons for the owner
                        <>
                        <Link className="btn-edit" to={'/votes/' + u.id}>Show</Link>
                        &nbsp;
                        <button className="btn-delete" onClick={() => onDeleteClick(u)}>Delete</button>
                        </>
                    )} */}
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
