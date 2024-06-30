import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import Select from 'react-select';

export default function ElectionForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [election, setElection] = useState({
    id: null,
    name: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    type: '',
    candidates: [],
  });
  const [availableCandidates, setAvailableCandidates] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const electionTypes = ['semi-online', 'online'];

  useEffect(() => {
    setLoading(true);
    axiosClient.get('/candidates')
      .then(({ data }) => {
        console.log("Candidates data:", data);
        setAvailableCandidates(data.data.map(candidate => ({
          value: candidate.id,
          label: candidate.name,
        })));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
        setLoading(false);
      });

    if (id) {
      axiosClient.get(`/elections/${id}`)
        .then(({ data }) => {
          setElection({
            ...data,
            candidates: data.candidates.map(candidate => ({
              value: candidate.id,
              label: candidate.name,
            })),
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching election data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    const submissionData = {
      ...election,
      candidates: election.candidates.map(candidate => candidate.value),
    };

    if (election.id) {
      axiosClient.put(`/elections/${election.id}`, submissionData)
        .then(() => {
          setNotification('Election was successfully updated');
          navigate('/elections');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post('/elections', submissionData)
        .then(() => {
          setNotification('Election was successfully created');
          navigate('/elections');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {election.id ? <h1>Update Election: {election.name}</h1> : <h1>New Election</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <label>Name</label>
            <input value={election.name} onChange={ev => setElection({ ...election, name: ev.target.value })} placeholder="Name" />
            <label>Description</label>
            <input value={election.description} onChange={ev => setElection({ ...election, description: ev.target.value })} placeholder="Description" />
            <label>Location</label>
            <input value={election.location} onChange={ev => setElection({ ...election, location: ev.target.value })} placeholder="Location" />
            <label>Start Date</label>
            <input type="date" value={election.startDate} onChange={ev => setElection({ ...election, startDate: ev.target.value })} placeholder="startdate" />
            <label>End Date</label>
            <input type="date" value={election.endDate} onChange={ev => setElection({ ...election, endDate: ev.target.value })} placeholder="enddate" />
            <label>Election Type</label>
            <select value={election.type} onChange={ev => setElection({ ...election, type: ev.target.value })} placeholder="type">
              <option value="" disabled>Select type</option>
              {electionTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label>Candidates</label>
            <Select
              isMulti
              value={election.candidates}
              onChange={selectedOptions => setElection({ ...election, candidates: selectedOptions })}
              options={availableCandidates}
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
