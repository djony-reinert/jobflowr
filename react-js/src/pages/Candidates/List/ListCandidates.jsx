import React, { useEffect } from 'react';
import ListCandidatesTable from "./components/Table/ListCandidatesTable";
import useFetchData from "../../../hooks/useFetchData";
import { API_CANDIDATES } from "../../../endpoints";
import { Helmet } from "react-helmet-async";

const ListCandidates = () => {
  const { connData, connLoading, doFetch } = useFetchData();

  useEffect(() => {
    doFetch({ ...API_CANDIDATES() });
  }, []);

  if (connLoading) { return <div>Loading...</div> }

  return (
    <>
      <Helmet>
        <title> Candidates | JobFlowr </title>
      </Helmet>

      <ListCandidatesTable data={connData}/>
    </>
  );
};

export default ListCandidates;