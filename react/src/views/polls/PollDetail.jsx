import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from '../../axios-client.js';
import { useStateContext } from "../../context/ContextProvider.jsx";
import './css/PollDetail.css';

export default function PollDetail() {
    const { id } = useParams();
    const [election, setElection] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setNotification, user } = useStateContext();

    useEffect(() => {
        axiosClient.get(`/elections/${id}`)
            .then(({ data }) => {
                setElection(data);
                setCandidates(data.candidates || []);
                setVotes(data.votes || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching election details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!election) {
        return <div className="text-center">Election not found.</div>;
    }

    return (
        <div className="poll-detail-page">
            <h1>{election.name}</h1>
            <p>{election.description}</p>
            <h2>Candidates</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Party</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.name}</td>
                            <td>{candidate.party}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Votes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Voter</th>
                        <th>Candidate</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {votes.map(vote => (
                        <tr key={vote.id}>
                            <td>{vote.voter?.name || 'N/A'}</td>
                            <td>{vote.candidate?.name || 'N/A'}</td>
                            <td>{new Date(vote.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
