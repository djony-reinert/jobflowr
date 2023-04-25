import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, FormControl, Grid } from '@mui/material';
import FormFullPage from "../../../components/Structure/FormFullPage/FormFullPage";
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from "../../../hooks/useFetchData";
import { API_USERS_CREATE, API_USERS_EDIT, API_USERS_UPDATE } from "../../../endpoints";
import { ROUTE_USERS, ROUTE_USERS_EDIT } from "../../../Router/routes";
import LinearProgress from "../../../components/Feedback/LinearProgress";
import FormikFieldText from "../../../components/Input/FormikFieldText";
import AccessTypeSelect from "./components/AccessTypeSelect";
import request from "../../../utils/request";

const EditUser = () => {
  const { connData, connLoading, doFetch, setConnLoading } = useFetchData();
  const { id } = useParams();
  const navigate = useNavigate();

  const doCreate = useCallback((data) => {
    request(
      API_USERS_CREATE(),
      data,
      "POST",
      (response) => {
        navigate(ROUTE_USERS_EDIT({ id: response?.id }));
        alert('Created successfully!');
      }
    );
  }, []);

  const doUpdate = useCallback((data) => {
    request(
      API_USERS_UPDATE({ id }),
      data,
      "PUT",
      () => {
        alert('Updated successfully!');
      }
    );
  }, [id]);

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
      first_name: connData?.first_name,
      last_name: connData?.last_name,
      email: connData?.email,
      phone: connData?.phone,
      role_id: connData?.role_id,
      password: '',
      confirm_password: ''
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
      onSubmit={id ? doUpdate : doCreate}
      onCancel={redirectBack}
      title={id ? 'Edit User' : 'New User'}
      actionButtonTitle={id ? 'Update' : 'Add'}
    >
      <Box sx={{ marginTop: -2 }}>
        <FormControl fullWidth>
          <AccessTypeSelect name="role_id" label="Access Type" />
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormikFieldText name='first_name' label="First name" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={6}>
              <FormikFieldText name='last_name' label="Last name"  fullWidth margin="normal"/>
            </Grid>
          </Grid>
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormikFieldText name='email' label="Email" type="email" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={6}>
              <FormikFieldText name='phone' label="Phone"  fullWidth margin="normal"/>
            </Grid>
          </Grid>
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormikFieldText name='password' label="Password" type="password" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={6}>
              <FormikFieldText name='confirm_password' label="Confirm Password" type="password" fullWidth margin="normal"/>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormFullPage>
  );
};

export default EditUser;