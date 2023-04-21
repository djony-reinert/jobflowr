import React, { useCallback, useEffect } from 'react';
import ListJobsTable from "./components/Table/ListJobsTable";
import useFetchData from "../../../hooks/useFetchData";
import { API_JOBS } from "../../../endpoints";
import { Helmet } from "react-helmet-async";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_JOBS_NEW } from "../../../Router/routes";

const ListJobs = () => {
  const { connData, connLoading, doFetch } = useFetchData();
  const navigate = useNavigate();

  useEffect(() => {
    doFetch({ ...API_JOBS() });
  }, []);

  const redirectToAddJob = useCallback(() => {
    navigate(ROUTE_JOBS_NEW());
  }, []);

  if (connLoading) { return <div>Loading...</div> }

  return (
    <>
      <Helmet>
        <title> Jobs | JobFlowr </title>
      </Helmet>

      <Box>
        <Box sx={{ px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">
            List Jobs
          </Typography>
          <Button variant="contained" color="primary" onClick={redirectToAddJob}>
            Add Job
          </Button>
        </Box>
        <Box>
          <ListJobsTable data={connData}/>
        </Box>
      </Box>
    </>
  );
};

export default ListJobs;