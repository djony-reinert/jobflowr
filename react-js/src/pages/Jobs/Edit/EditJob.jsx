import React, { useEffect, useMemo, useCallback } from 'react';
import { Form } from 'formik';
import { FormControl, Grid } from '@mui/material';
import FormFullPage from "../../../components/Structure/FormFullPage/FormFullPage";
import { useParams } from 'react-router-dom';
import FormikFieldText from "../../../components/Input/FormikFieldText";
import useFetchData from "../../../hooks/useFetchData";
import { API_JOBS_EDIT } from "../../../endpoints";
import RemoteTypeSelect from "./components/RemoteTypeSelect";
import useDepartmentData from "../../../hooks/appData/useDepartmentData";
import DepartmentSelect from "./components/DepartmentSelect";
import SalaryIntervalSelect from "./components/SalaryIntervalSelect";
import { useNavigate } from "react-router-dom";
import { ROUTE_JOBS } from "../../../Router/routes";

const EditJob = () => {
  const { connData, connLoading, doFetch } = useFetchData();
  const { connData: departmentConnData, connLoading: departmentConnLoading } = useDepartmentData();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    doFetch({ ...API_JOBS_EDIT({ id }) });
  }, [id])

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
    navigate(ROUTE_JOBS());
  }, []);

  if (connLoading || departmentConnLoading) return;

  return (
    <FormFullPage
      initialValues={initialValues}
      onSubmit={() => {}}
      onCancel={redirectBack}
      title={id ? 'Edit Job' : 'New Job'}
      actionButtonTitle={id ? 'Update' : 'Add'}
    >
      <Form>
        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormikFieldText name='title' label="Title" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={6}>
              <FormikFieldText label="Location" name='location' fullWidth margin="normal"/>
            </Grid>
          </Grid>
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <DepartmentSelect name='department_id' label='Department' departments={departmentConnData} />
            </Grid>
            <Grid item xs={6}>
              <RemoteTypeSelect name='remote_type_id' label='Remote Work' />
            </Grid>
          </Grid>
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <SalaryIntervalSelect name='salary_interval' label='Salary Interval' />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <FormikFieldText name='salary_minimum' label="Salary Minimum" fullWidth margin="normal" />
                </Grid>
                <Grid item xs={6}>
                  <FormikFieldText name='salary_maximum' label="Salary Maximum" fullWidth margin="normal" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
        <FormikFieldText name='description' label="Description" fullWidth multiline rows={14} margin="normal" />
      </Form>
    </FormFullPage>
  );
};

export default EditJob;