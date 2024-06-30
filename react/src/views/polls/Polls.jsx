import {useEffect, useState} from "react";
import axiosClient from '../../axios-client.js';
import { Link } from 'react-router-dom';
import './css/Polls.css';
import {useStateContext} from "../../context/ContextProvider.jsx";


export default function Polls() {
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setNotification, user} = useStateContext()

    useEffect(() => {
        getElections();
      }, [])

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
        <div className="polls-page">
            <h1>Polls</h1>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elections.map((election) => (
                            <tr key={election.id}>
                                <td>{election.name}</td>
                                <td>{election.description}</td>
                                <td>{election.location}</td>
                                <td>{election.startDate}</td>
                                <td>{election.endDate}</td>
                                <td>
                                    <Link to={`/polls/${election.id}`} className="btn-view">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
