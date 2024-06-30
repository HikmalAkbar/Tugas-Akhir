import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/auth/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/auth/Signup";
import Users from "./views/users/Users";
import UserForm from "./views/users/UserForm";
import Elections from "./views/elections/Elections";
import ElectionForm from "./views/elections/ElectionForm";
import Candidates from "./views/candidates/Candidates";
import CandidateForm from "./views/candidates/CandidateForm";
import Voters from "./views/voters/Voters";
import VoterForm from "./views/voters/VoterForm";
import Votes from "./views/votes/Votes.jsx";
import Polls from './views/polls/Polls.jsx';
import PollDetail from './views/polls/PollDetail.jsx';
import HomeLayout from "./components/HomeLayout";
import HomePage from "./views/home/HomePage.jsx";
import ElectionDetailsPage from "./views/home/ElectionDetailsPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />
          },
          {
            path: 'home/elections/:id',
            element: <ElectionDetailsPage />
          },
        ]
    },
    {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/elections',
        element: <Elections/>
      },
      {
        path: '/elections/new',
        element: <ElectionForm key="electionCreate" />
      },
      {
        path: '/elections/:id',
        element: <ElectionForm key="electionUpdate" />
      },
      {
        path: '/candidates',
        element: <Candidates/>
      },
      {
        path: '/candidates/new',
        element: <CandidateForm key="candidateCreate" />
      },
      {
        path: '/candidates/:id',
        element: <CandidateForm key="candidateUpdate" />
      },
      {
        path: '/voters',
        element: <Voters/>
      },
      {
        path: '/voters/new',
        element: <VoterForm key="voterCreate" />
      },
      {
        path: '/voters/:id',
        element: <VoterForm key="voterUpdate" />
      },
      {
        path: '/votes',
        element: <Votes/>
      },
      {
        path: '/polls',
        element: <Polls/>
      },
      {
        path: '/polls/:id',
        element: <PollDetail/>
      },
    //   {
    //     path: '/votes/new',
    //     element: <VoterForm key="voterCreate" />
    //   },
    //   {
    //     path: '/votes/:id',
    //     element: <VoteForm key="voteUpdate" />
    //   },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
