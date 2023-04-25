import React, { useCallback, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import FormFullPage from "../../../components/Structure/FormFullPage/FormFullPage";
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from "../../../hooks/useFetchData";
import { API_USERS_EDIT } from "../../../endpoints";
import { ROUTE_USERS } from "../../../Router/routes";
import LinearProgress from "../../../components/Feedback/LinearProgress";

const EditUser = () => {
  const { connData, connLoading, doFetch, setConnLoading } = useFetchData();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      doFetch(API_USERS_EDIT({ id }));
    } else {
      setConnLoading(false);
    }
  }, [id]);

  const initialValues = useMemo(() => {
    if (!connData) {
      return {}
    }

    return {
      title: connData?.title,
      description: connData?.description,
      location: connData?.location,
      company: connData?.company,
      department_id: connData?.department_id,
      remote_type_id: connData?.remote_type_id,
      salary_interval: connData?.salary_interval,
      salary_minimum: connData?.salary_minimum,
      salary_maximum: connData?.salary_maximum,
    }
  }, [connData]);

  const redirectBack = useCallback(() => {
    navigate(ROUTE_USERS());
  }, []);

  if (connLoading) {
    return <LinearProgress />
  };

  return (
    <FormFullPage
      initialValues={initialValues}
      onSubmit={() => {}}
      onCancel={redirectBack}
      title={id ? 'Edit User' : 'New User'}
      actionButtonTitle={id ? 'Update' : 'Add'}
    >
      <Box sx={{ marginTop: -2 }}>
        Coming soon
      </Box>
    </FormFullPage>
  );
};

export default EditUser;