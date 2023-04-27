import React from 'react';
import { FormControl, Grid, Typography } from "@mui/material";
import UserSelect from "@reactjs/components/Input/UserSelect";
import RecruitmentTeamRoleSelect from "@reactjs/pages/Jobs/Edit/components/RecruitmentTeamRoleSelect";

const RecruitmentTeamSection = ({ users }) => {
  return (
    <>
      <Typography variant='h6'>Recruitment Team</Typography>

      <FormControl fullWidth>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <UserSelect name='recruitment_team.0.user_id' label='Responsible' users={users} />
          </Grid>
          <Grid item xs={6}>
            <RecruitmentTeamRoleSelect name='recruitment_team.0.recruitment_team_role_id' label='Recruitment Team Role' />
          </Grid>
        </Grid>
      </FormControl>

      <FormControl fullWidth>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <UserSelect name='recruitment_team.1.user_id' label='Responsible' users={users} />
          </Grid>
          <Grid item xs={6}>
            <RecruitmentTeamRoleSelect name='recruitment_team.1.recruitment_team_role_id' label='Recruitment Team Role' />
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};

export default RecruitmentTeamSection;
