import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../pages/Dashboard/components/DashboardLayout';
import AppLayout from '../pages/App/AppLayout';
import Login from '../pages/Login/Login';
import Page404 from '../pages/Page404';
import Dashboard from '../pages/Dashboard/Dashboard';
import ListJobs from "../pages/Jobs/List/ListJobs";
import ListCandidates from "../pages/Candidates/List/ListCandidates";
import {
  ROUTE_JOBS,
  ROUTE_CANDIDATES,
  ROUTE_JOBS_NEW,
  ROUTE_JOBS_EDIT,
  ROUTE_USERS,
  ROUTE_USERS_NEW,
  ROUTE_USERS_EDIT, ROUTE_CANDIDATES_NEW, ROUTE_CANDIDATES_EDIT, ROUTE_REPORTS
} from "./routes";
import EditJob from "../pages/Jobs/Edit/EditJob";
import EditUser from "../pages/Users/Edit/EditUser";
import ListUsers from "../pages/Users/List/ListUsers";
import EditCandidate from "../pages/Candidates/Edit/EditCandidate";
import Reports from "@reactjs/pages/Reports/Reports";

const RoutesConfig = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: ROUTE_JOBS(), element: <ListJobs /> },
        { path: ROUTE_JOBS_NEW(), element: <EditJob /> },
        { path: ROUTE_JOBS_EDIT({ id: ':id' }), element: <EditJob /> },
        { path: ROUTE_USERS(), element: <ListUsers /> },
        { path: ROUTE_USERS_NEW(), element: <EditUser /> },
        { path: ROUTE_USERS_EDIT({ id: ':id' }), element: <EditUser /> },
        { path: ROUTE_CANDIDATES(), element: <ListCandidates /> },
        { path: ROUTE_CANDIDATES_NEW(), element: <EditCandidate /> },
        { path: ROUTE_CANDIDATES_EDIT({ id: ':id' }), element: <EditCandidate /> },
        { path: ROUTE_REPORTS(), element: <Reports /> }
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      element: <AppLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

export default RoutesConfig;
