import React, {useEffect} from 'react';
import ListJobsTable from "./components/Table/ListJobsTable";
import useFetchData from "../../../hooks/useFetchData";
import {API_JOBS} from "../../../endpoints";

const ListJobs = () => {
  const { connData, connLoading, doFetch } = useFetchData();

  useEffect(() => {
    doFetch({ ...API_JOBS() });
  }, []);

  if (connLoading) { return <div>Loading...</div> }

  return <ListJobsTable data={connData}/>
};

export default ListJobs;