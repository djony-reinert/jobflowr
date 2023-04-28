import React, { useCallback, useEffect, useMemo } from 'react';
import ListUsersTable from "./components/Table/ListUsersTable";
import useFetchData from "../../../hooks/useFetchData";
import { API_USERS } from "../../../endpoints";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_USERS_NEW } from "../../../Router/routes";
import PageLayout from "../../../components/Display/Layout/PageLayout";
import LinearProgress from "../../../components/Feedback/LinearProgress";

const ListUsers = () => {
  const { connData, connLoading, doFetch } = useFetchData();
  const navigate = useNavigate();

  const doRefresh = useCallback(() => {
    doFetch(API_USERS());
  }, []);

  useEffect(() => {
    doRefresh();
  }, []);

  const redirectToAddUser = useCallback(() => {
    navigate(ROUTE_USERS_NEW());
  }, []);

  const actions = useMemo(() => {
    return [
      <Button key={0} variant="contained" color="primary" onClick={redirectToAddUser}>
        Add User
      </Button>
    ];
  }, [redirectToAddUser]);

  if (connLoading) {
    return <LinearProgress />
  };

  return (
    <PageLayout title='List Users' actions={actions}>
      <ListUsersTable data={connData} doRefresh={doRefresh}/>
    </PageLayout>
  );
};

export default ListUsers;
