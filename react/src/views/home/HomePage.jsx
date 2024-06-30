import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
    const [onlineElections, setOnlineElections] = useState([]);
    const [semiOnlineElections, setSemiOnlineElections] = useState([]);

    useEffect(() => {
        const fetchOnlineElections = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/home/online-elections?limit=5');
                setOnlineElections(response.data.data);
            } catch (error) {
                console.error('Error fetching online elections:', error);
            }
        };

        const fetchSemiOnlineElections = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/home/semi-online-elections?limit=5');
                setSemiOnlineElections(response.data.data);
            } catch (error) {
                console.error('Error fetching semi-online elections:', error);
            }
        };

        fetchOnlineElections();
        fetchSemiOnlineElections();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <br />
            <section>
                <h2>Online Elections</h2>
                    <br />
                <div className="election-grid">
                    {onlineElections.map(election => (
                        <div key={election.id} className="election-card">
                            <Link to={`/home/elections/${election.id}`} style={{ textDecoration: 'none' }}>
                            <img src="./src/logo/imageelection.jpg" alt="Online Election" />
                            <h3>{election.name}</h3>

                            <p>{election.description}</p>
                            <p>{election.startDate}</p>
                            <p>{election.startTime}</p>
                            <p>{election.location}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2>Semi-Online Elections</h2>
                    <br />
                <div className="election-grid">
                    {semiOnlineElections.map(election => (
                        <div key={election.id} className="election-card">
                            <Link to={`/home/election/${election.id}`} style={{ textDecoration: 'none' }}/>
                            <img src="./src/logo/imageelection2.jpg" alt="Semi-Online Election" />
                            <h3>{election.name}</h3>
                            <p>{election.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
