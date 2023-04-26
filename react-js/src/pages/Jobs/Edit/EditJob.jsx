import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, FormControl, Grid } from '@mui/material';
import FormFullPage from "../../../components/Structure/FormFullPage/FormFullPage";
import { useNavigate, useParams } from 'react-router-dom';
import FormikFieldText from "../../../components/Input/FormikFieldText";
import useFetchData from "../../../hooks/useFetchData";
import { API_JOBS_CREATE, API_JOBS_EDIT, API_JOBS_UPDATE } from "../../../endpoints";
import RemoteTypeSelect from "./components/RemoteTypeSelect";
import useDepartmentsData from "../../../hooks/appData/useDepartmentsData";
import DepartmentSelect from "./components/DepartmentSelect";
import SalaryIntervalSelect from "./components/SalaryIntervalSelect";
import { ROUTE_JOBS, ROUTE_JOBS_EDIT } from "../../../Router/routes";
import request from "../../../utils/request";
import LinearProgress from "../../../components/Feedback/LinearProgress";
import UserSelect from "@reactjs/components/Input/UserSelect";
import RecruitmentTeamRoleSelect from "@reactjs/pages/Jobs/Edit/components/RecruitmentTeamRoleSelect";
import useUsersData from "@reactjs/hooks/appData/useUsersData";
import JobTypeSelect from "@reactjs/pages/Jobs/Edit/components/JobTypeSelect";
import CareerLevelSelect from "@reactjs/components/Input/CareerLevelSelect";
import DegreeSelect from "@reactjs/components/Input/DegreeSelect";
import JobStatusSelect from "@reactjs/pages/Jobs/Edit/components/JobStatusSelect";

const EditJob = () => {
  const { connData, connLoading, doFetch, setConnLoading } = useFetchData();
  const { connData: departmentsConnData, connLoading: departmentsConnLoading } = useDepartmentsData();
  const { connData: usersConnData, connLoading: usersConnLoading } = useUsersData();
  const { id } = useParams();
  const navigate = useNavigate();
  const job = connData?.job;
  const jobAssignment = connData?.job_assignment;

  const doCreate = useCallback((data) => {
    request(
      API_JOBS_CREATE(),
      data,
      "POST",
      (response) => {
        navigate(ROUTE_JOBS_EDIT({ id: response?.id }));
        alert('Created successfully!');
      }
    );
  }, []);

  const doUpdate = useCallback((data) => {
    request(
      API_JOBS_UPDATE({ id }),
      data,
      "PUT",
      () => {
        alert('Updated successfully!');
      }
    );
  }, [id]);

  useEffect(() => {
    if (id) {
      doFetch(API_JOBS_EDIT({ id }));
    } else {
      setConnLoading(false);
    }
  }, [id]);

  const initialValues = useMemo(() => {
    if (!connData) {
      return {}
    }

    return {
      title: job?.title,
      status_id: job?.status_id,
      user_id: jobAssignment?.user_id,
      recruitment_team_role_id: jobAssignment?.recruitment_team_role_id,
      job_type_id: job?.job_type_id,
      career_level_id: job?.career_level_id,
      desired_degree_id: job?.desired_degree_id,
      description: job?.description,
      location: job?.location,
      company: job?.company,
      department_id: job?.department_id,
      remote_type_id: job?.remote_type_id,
      salary_interval: job?.salary_interval,
      salary_minimum: job?.salary_minimum,
      salary_maximum: job?.salary_maximum,
    }
  }, [connData]);

  const redirectBack = useCallback(() => {
    navigate(ROUTE_JOBS());
  }, []);

  if (connLoading || departmentsConnLoading || usersConnLoading) {
    return <LinearProgress />;
  }

  return (
    <FormFullPage
      initialValues={initialValues}
      onSubmit={id ? doUpdate : doCreate}
      onCancel={redirectBack}
      title={id ? 'Edit Job' : 'New Job'}
      actionButtonTitle={id ? 'Update' : 'Add'}
    >
      <Box sx={{ marginTop: -2 }}>
        <FormControl fullWidth>
          <JobStatusSelect name='status_id' label='Status' fullWidth margin="normal"/>
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormikFieldText name='title' label="Title" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={6}>
              <JobTypeSelect name='job_type_id' label='Job Type' />
            </Grid>
          </Grid>
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <DepartmentSelect name='department_id' label='Department' departments={departmentsConnData} />
            </Grid>
            <Grid item xs={6}>
              <RemoteTypeSelect name='remote_type_id' label='Remote Work' />
            </Grid>
          </Grid>
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormikFieldText name='company' label='Company' fullWidth margin="normal"/>
            </Grid>
            <Grid item xs={6}>
              <FormikFieldText name='location' label="Location"  fullWidth margin="normal"/>
            </Grid>
          </Grid>
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CareerLevelSelect name='career_level_id' label='Career Level' />
            </Grid>
            <Grid item xs={6}>
              <DegreeSelect name='desired_degree_id' label='Desired Degree' />
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

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <UserSelect name='user_id' label='Responsible' users={usersConnData} />
            </Grid>
            <Grid item xs={6}>
              <RecruitmentTeamRoleSelect name='recruitment_team_role_id' label='Recruitment Team Role' />
            </Grid>
          </Grid>
        </FormControl>

        <FormikFieldText name='description' label="Description" fullWidth multiline rows={14} margin="normal" />
      </Box>
    </FormFullPage>
  );
};

export default EditJob;