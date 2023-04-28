import { useEffect } from 'react';
import useFetchData from "../useFetchData";
import { API_USERS } from "../../endpoints";

const useUsersData = () => {
  const { connLoading, connErrorEl, connData, doFetch } = useFetchData();

  useEffect(() => {
    doFetch(API_USERS());
  }, []);

  return {
    connLoading,
    connErrorEl,
    connData
  };
};

export default useUsersData;
