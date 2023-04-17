import React from "react";
import ListJobs from "../pages/Jobs/List/ListJobs";
import { ROUTE_JOBS } from "./routes";
import { useRoutes } from "react-router-dom";

function RoutesConfig() {
  const element = useRoutes([
    {
      path: ROUTE_JOBS(),
      element: <ListJobs />,
      exact: true,
    },
  ]);

  return element;
}

export default RoutesConfig;
