import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../pages/Dashboard/components/DashboardLayout';
import AppLayout from '../pages/App/AppLayout';
import Login from '../pages/Login/Login';
import Page404 from '../pages/Page404';
import Dashboard from '../pages/Dashboard/Dashboard';
import ListJobs from "../pages/Jobs/List/ListJobs";
import { ROUTE_JOBS } from "./routes";

const RoutesConfig = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: ROUTE_JOBS(), element: <ListJobs /> },
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