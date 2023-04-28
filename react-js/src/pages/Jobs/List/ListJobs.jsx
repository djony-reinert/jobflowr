import React, { useCallback, useEffect, useMemo } from 'react';
import ListJobsTable from "./components/Table/ListJobsTable";
import useFetchData from "../../../hooks/useFetchData";
import { API_JOBS } from "../../../endpoints";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_JOBS_NEW } from "../../../Router/routes";
import PageLayout from "../../../components/Display/Layout/PageLayout";
import LinearProgress from "@reactjs/components/Feedback/LinearProgress";

const ListJobs = () => {
  const { connData, connLoading, doFetch } = useFetchData();
  const navigate = useNavigate();

  const doRefresh = useCallback(() => {
    doFetch(API_JOBS());
  }, []);

  useEffect(() => {
    doRefresh();
  }, []);

  const redirectToAddJob = useCallback(() => {
    navigate(ROUTE_JOBS_NEW());
  }, []);

  const actions = useMemo(() => {
    return [
      <Button key={0} variant="contained" color="primary" onClick={redirectToAddJob}>
        Add Job
      </Button>
    ];
  }, [redirectToAddJob]);

  if (connLoading) {
    return <LinearProgress />
  }

  return (
    <PageLayout title='List Jobs' actions={actions}>
      <ListJobsTable data={connData} doRefresh={doRefresh}/>
    </PageLayout>
  );
};

export default ListJobs;
