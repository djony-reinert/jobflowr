import React, {useEffect} from 'react';
import ListJobsTable from "./components/Table/ListJobsTable";
import useFetchData from "../../../hooks/useFetchData";
import {API_JOBS} from "../../../endpoints";
import {Helmet} from "react-helmet-async";

const ListJobs = () => {
  const { connData, connLoading, doFetch } = useFetchData();

  useEffect(() => {
    doFetch({ ...API_JOBS() });
  }, []);

  if (connLoading) { return <div>Loading...</div> }

  return (
    <>
      <Helmet>
        <title> Jobs | JobFlowr </title>
      </Helmet>

      <ListJobsTable data={connData}/>
    </>
  );
};

export default ListJobs;