import React, { useCallback, useEffect, useMemo } from 'react';
import ListCandidatesTable from "./components/Table/ListCandidatesTable";
import useFetchData from "../../../hooks/useFetchData";
import { API_CANDIDATES } from "../../../endpoints";
import { useNavigate } from "react-router-dom";
import { ROUTE_CANDIDATES_NEW } from "../../../Router/routes";
import { Button } from "@mui/material";
import PageLayout from "../../../components/Display/Layout/PageLayout";
import LinearProgress from "../../../components/Feedback/LinearProgress";

const ListCandidates = () => {
  const { connData, connLoading, doFetch } = useFetchData();
  const navigate = useNavigate();

  const doRefresh = useCallback(() => {
    doFetch(API_CANDIDATES());
  }, []);

  useEffect(() => {
    doRefresh();
  }, []);

  const redirectToAddCandidate = useCallback(() => {
    navigate(ROUTE_CANDIDATES_NEW());
  }, []);

  const actions = useMemo(() => {
    return [
      <Button key={0} variant="contained" color="primary" onClick={redirectToAddCandidate}>
        Add Candidate
      </Button>
    ];
  }, [redirectToAddCandidate]);

  if (connLoading) {
    return <LinearProgress />
  };

  return (
    <PageLayout title='List Candidates' actions={actions}>
      <ListCandidatesTable data={connData} doRefresh={doRefresh} />
    </PageLayout>
  );
};

export default ListCandidates;
