import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function VoterForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [voter, setVoter] = useState({
    id: null,
    name: '',
    nik: '',
    address: '',
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/voters/${id}`)
        .then(({data}) => {
          setLoading(false)
          setVoter(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (voter.id) {
      axiosClient.put(`/voters/${voter.id}`, voter)
        .then(() => {
          setNotification('Voter was successfully updated')
          navigate('/voters')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/voters', voter)
        .then(() => {
          setNotification('Voter was successfully created')
          navigate('/voters')
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
      {voter.id && <h1>Update Voter: {voter.name}</h1>}
      {!voter.id && <h1>New Voter</h1>}
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
            <label>Name</label>
            <input value={voter.name} onChange={ev => setVoter({...voter, name: ev.target.value})} placeholder="Name"/>
            <label>NIK</label>
            <input value={voter.nik} onChange={ev => setVoter({...voter, nik: ev.target.value})} placeholder="NIK"/>
            <label>Address</label>
            <input value={voter.address} onChange={ev => setVoter({...voter, address: ev.target.value})} placeholder="Address"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
