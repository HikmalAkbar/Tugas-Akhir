import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function CandidateForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [candidate, setCandidate] = useState({
    id: null,
    name: '',
    party: '',
    bio: '',
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/candidates/${id}`)
        .then(({data}) => {
          setLoading(false)
          setCandidate(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (candidate.id) {
      axiosClient.put(`/candidates/${candidate.id}`, candidate)
        .then(() => {
          setNotification('Candidate was successfully updated')
          navigate('/candidates')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/candidates', candidate)
        .then(() => {
          setNotification('Candidate was successfully created')
          navigate('/candidates')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {candidate.id && <h1>Update Candidate: {candidate.name}</h1>}
      {!candidate.id && <h1>New Candidate</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={candidate.name} onChange={ev => setCandidate({...candidate, name: ev.target.value})} placeholder="Name"/>
            <input value={candidate.party} onChange={ev => setCandidate({...candidate, party: ev.target.value})} placeholder="Party"/>
            <input value={candidate.bio} onChange={ev => setCandidate({...candidate, bio: ev.target.value})} placeholder="Bio"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
