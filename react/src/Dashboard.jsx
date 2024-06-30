import {useEffect, useState} from "react";
import axiosClient from "../src/axios-client.js"; // Make sure to have axios-client properly set up

function Dashboard() {
  const [counts, setCounts] = useState({
    elections: 0,
    candidates: 0,
    voters: 0,
    users: 0,
  });

//   useEffect(() => {
//     // Fetch the counts from the backend
//     const fetchCounts = async () => {
//       try {
//         const electionsResponse = await axiosClient.get('/elections/count');
//         const candidatesResponse = await axiosClient.get('/candidates/count');
//         const votersResponse = await axiosClient.get('/voters/count');
//         const usersResponse = await axiosClient.get('/users/count');

//         setCounts({
//           elections: electionsResponse.data.count,
//           candidates: candidatesResponse.data.count,
//           voters: votersResponse.data.count,
//           users: usersResponse.data.count,
//         });
//       } catch (error) {
//         console.error("Error fetching counts:", error);
//       }
//     };

//     fetchCounts();
//   }, []);

  return (
    <div className="dashboard-layout">
      <h1>Dashboard</h1>
      <div className="card-row">
        <div className="card">
          <img src="../src/logo/election.png" alt="Elections Logo" className="card-logo" />
          <h2>Elections</h2>
          <p>{counts.elections}</p>
        </div>
        <div className="card">
          <img src="../src/logo/candidate.png" alt="Candidates Logo" className="card-logo" />
          <h2>Candidates</h2>
          <p>{counts.candidates}</p>
        </div>
        <div className="card">
          <img src="../src/logo/voters.png" alt="Pemilih Logo" className="card-logo" />
          <h2>Pemilih</h2>
          <p>{counts.voters}</p>
        </div>
        <div className="card">
          <img src="../src/logo/user.png" alt="Users Logo" className="card-logo" />
          <h2>Users</h2>
          <p>{counts.users}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
