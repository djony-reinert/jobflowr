import { useEffect } from 'react';
import useFetchData from "../useFetchData";
import { API_DEPARTMENTS } from "../../endpoints";

const useDepartmentData = () => {
  const { connLoading, connErrorEl, connData, doFetch } = useFetchData();

  useEffect(() => {
    doFetch(API_DEPARTMENTS());
  }, []);

  return {
    connLoading,
    connErrorEl,
    connData
  };
};

export default useDepartmentData;