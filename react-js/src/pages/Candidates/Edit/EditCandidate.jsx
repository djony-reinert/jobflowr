import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, FormControl, Grid } from '@mui/material';
import FormFullPage from "../../../components/Structure/FormFullPage/FormFullPage";
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from "../../../hooks/useFetchData";
import { API_CANDIDATES_EDIT, API_CANDIDATES_CREATE, API_CANDIDATES_UPDATE } from "@reactjs/endpoints";
import { ROUTE_CANDIDATES, ROUTE_CANDIDATES_EDIT } from "../../../Router/routes";
import LinearProgress from "../../../components/Feedback/LinearProgress";
import request from "@reactjs/utils/request";
import FormikFieldText from "@reactjs/components/Input/FormikFieldText";
import CareerLevelSelect from "@reactjs/components/Input/CareerLevelSelect";
import GenderSelect from "@reactjs/pages/Candidates/Edit/components/GenderSelect";

const EditCandidate = () => {
  const { connData, connLoading, doFetch, setConnLoading } = useFetchData();
  const { id } = useParams();
  const navigate = useNavigate();

  const doCreate = useCallback((data) => {
    request(
      API_CANDIDATES_CREATE(),
      data,
      "POST",
      (response) => {
        navigate(ROUTE_CANDIDATES_EDIT({ id: response?.id }));
        alert('Created successfully!');
      }
    );
  }, []);

  const doUpdate = useCallback((data) => {
    request(
      API_CANDIDATES_UPDATE({ id }),
      data,
      "PUT",
      () => {
        alert('Updated successfully!');
      }
    );
  }, [id]);

  useEffect(() => {
    if (id) {
      doFetch(API_CANDIDATES_EDIT({ id }));
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
      career_level_id: connData?.career_level_id,
      gender_id: connData?.gender_id
    }
  }, [connData]);

  const redirectBack = useCallback(() => {
    navigate(ROUTE_CANDIDATES());
  }, []);

  if (connLoading) {
    return <LinearProgress />
  };

  return (
    <FormFullPage
      initialValues={initialValues}
      onSubmit={id ? doUpdate : doCreate}
      onCancel={redirectBack}
      title={id ? 'Edit Candidate' : 'New Candidate'}
      actionButtonTitle={id ? 'Update' : 'Add'}
    >
      <Box sx={{ marginTop: -2 }}>
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
              <CareerLevelSelect name='career_level_id' label="Career Level" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={6}>
              <GenderSelect name='gender_id' label="Gender" fullWidth margin="normal" />
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </FormFullPage>
  );
};

export default EditCandidate;