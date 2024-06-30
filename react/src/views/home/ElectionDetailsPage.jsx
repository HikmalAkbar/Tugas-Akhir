import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import './ElectionDetailPage.css';

function ElectionDetailPage() {
    const [election, setElection] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [voteCandidate, setVoteCandidate] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchElection = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/home/elections/${id}`);
                setElection(response.data);
                setCandidates(response.data.candidates);
            } catch (error) {
                console.error('Error fetching election details:', error);
            }
        };

        fetchElection();
    }, [id]);

    const openBioModal = (candidate) => {
        setSelectedCandidate(candidate);
        document.getElementById('bioModal').style.display = 'block';
    };

    const closeBioModal = () => {
        setSelectedCandidate(null);
        document.getElementById('bioModal').style.display = 'none';
    };

    const openVoteModal = (candidate) => {
        setVoteCandidate(candidate);
        document.getElementById('voteModal').style.display = 'block';
    };

    const closeVoteModal = () => {
        setVoteCandidate(null);
        document.getElementById('voteModal').style.display = 'none';
    };

    const handleVote = async () => {
        try {
            await axios.post(`http://localhost:8000/api/home/vote`, { candidate_id: voteCandidate.id });
            alert('Vote submitted successfully!');
            closeVoteModal();
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    if (!election) {
        return <div>Loading...</div>;
    }

    return (
        <div className="election-detail-container">
            <div className="election-header-container">
                <img src={election.image || 'election-image-placeholder.png'} alt="Election" />
                <div>
                    <h1>{election.name}</h1>
                    <p className="election-description">{election.description}</p>
                    <p className="election-description">{election.startDate}</p>
                    <p className="election-description">{election.startTime}</p>
                    <p className="election-description">{election.location}</p>
                </div>
            </div>
            <br />
            <h2>Candidates</h2>
            <br />
            <div className="candidate-grid-container">
                {candidates.map(candidate => (
                    <div key={candidate.id} className="candidate-card-container">
                        <img src={candidate.image || '/candidate-image-placeholder.png'} alt="Candidate" />
                        <h3>{candidate.name}</h3>
                        <p>{candidate.bio}</p>
                        <button className="custom-button" onClick={() => openBioModal(candidate)}>Info</button>
                        <button className="custom-button" onClick={() => openVoteModal(candidate)}>Vote</button>
                    </div>
                ))}
            </div>

            {/* Bio Modal */}
            <div id="bioModal" className="custom-modal">
                <div className="custom-modal-content">
                    <span className="custom-close" onClick={closeBioModal}>&times;</span>
                    {selectedCandidate && (
                        <div>
                            <h2>{selectedCandidate.name}</h2>
                            <p>{selectedCandidate.bio}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Vote Modal */}
            <div id="voteModal" className="custom-modal">
                <div className="custom-modal-content">
                    <span className="custom-close" onClick={closeVoteModal}>&times;</span>
                    {voteCandidate && (
                        <div>
                            <h2>Vote for {voteCandidate.name}</h2>
                            <br />
                            <label>Input Token</label>
                            <input type="text" />
                            <button className="custom-button" onClick={handleVote}>Submit Vote</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ElectionDetailPage;
