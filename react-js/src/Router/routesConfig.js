import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import DashboardAppPage from '../pages/DashboardAppPage';
import ListJobs from "../pages/Jobs/List/ListJobs";
import { ROUTE_JOBS } from "./routes";

const RoutesConfig = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <DashboardAppPage /> },
        { path: ROUTE_JOBS(), element: <ListJobs /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
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