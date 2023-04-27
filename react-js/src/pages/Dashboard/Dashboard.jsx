import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid, Typography } from '@mui/material';
import { SummaryChart,JobAssignmentsChart, UncompletedTasksChart } from '@reactjs/pages/Dashboard/components/Charts';
import { API_CHARTS } from "@reactjs/endpoints";
import useFetchData from "@reactjs/hooks/useFetchData";
import LinearProgress from "@reactjs/components/Feedback/LinearProgress";
import useUsersData from "@reactjs/hooks/appData/useUsersData";

const Dashboard = () => {
  const { connLoading, connData, doFetch } = useFetchData();
  const { connData: usersConnData, connLoading: usersConnLoading } = useUsersData();

  useEffect(() => {
    if (usersConnData?.[0]?.id) {
      doFetch(API_CHARTS({ userId: usersConnData?.[0]?.id }));

    }
  }, [usersConnData]);

  if (connLoading || usersConnLoading) {
    return <LinearProgress />
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | JobFlowr </title>
      </Helmet>

      <Box sx={{ px: 2 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryChart title="New job applications today" total={connData?.job_applications_created_today} icon={'ant-design:file-search'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryChart title="Candidates with offers" total={connData?.candidates_with_offer_status} color="info" icon={'ant-design:dollar'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryChart title="Candidates hired" total={connData?.candidates_hired} color="warning" icon={'ant-design:check'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryChart title="Your completed tasks" total={connData?.completed_tasks} color="success" icon={'ant-design:file-done'} />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={6}>
            <JobAssignmentsChart data={connData?.job_assignments_of_published_jobs_by_user} users={usersConnData}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <UncompletedTasksChart data={connData?.uncompleted_tasks_by_user} users={usersConnData}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
