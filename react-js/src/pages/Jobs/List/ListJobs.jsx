import React from 'react';
import ListJobsTable from "./components/Table/ListJobsTable";
import useFetchData from "../../../hooks/useFetchData";

const ListJobs = () => {
  const { connData, connLoading } = useFetchData({ endpoint: 'jobs' });

  if (connLoading) { return <div>Loading...</div> }

  return <ListJobsTable data={connData}/>
};

export default ListJobs;