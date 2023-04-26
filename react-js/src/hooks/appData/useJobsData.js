import { useEffect } from 'react';
import useFetchData from "../useFetchData";
import { API_JOBS } from "@reactjs/endpoints";

const useJobsData = () => {
  const { connLoading, connErrorEl, connData, doFetch } = useFetchData();

  useEffect(() => {
    doFetch(API_JOBS());
  }, []);

  return {
    connLoading,
    connErrorEl,
    connData
  };
};

export default useJobsData;
