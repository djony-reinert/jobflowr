import React, { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { Divider, FormControl, Typography } from '@mui/material';
import FormikAutocomplete from "@reactjs/components/Input/FormikAutocomplete";
import CandidateStatusSelect from "@reactjs/pages/Candidates/Edit/components/CandidateStatusSelect";

const JobApplicationsSection = ({ jobs, jobApplications }) => {
  const { setFieldValue } = useFormikContext();
  const selectedJobsFieldName = 'selected_jobs';

  const handleOnChange = useCallback((e, value) => {
    setFieldValue(selectedJobsFieldName, value);
  }, []);

  const filteredJobs = jobs?.filter((job) => {
    return !jobApplications?.find((jobApplication) => jobApplication.job_id === job.id);
  });

  return (
    <>
      <Typography variant='h6'>Job Applications</Typography>

      {jobApplications?.map((jobApplication) => {
        const job = jobs.find((item) => item.id === jobApplication.job_id);

        return (
          <FormControl fullWidth key={jobApplication.id} margin='normal'>
            <Typography>Job: {job.title}</Typography>
            <CandidateStatusSelect
              name={`job_applications.${jobApplication.id}.candidate_status_id`}
              label='Candidate Status'
            />
          </FormControl>
        );
      })}

      {jobApplications?.length > 0 ? (
        <Divider sx={{ my: 2 }} />
      ) : null}

      <FormikAutocomplete
        sx={{ my: 2 }}
        multiple
        name={selectedJobsFieldName}
        label='Assign To Job'
        options={filteredJobs}
        getOptionLabel={option => option.title}
        handleOnChange={handleOnChange}
      />
    </>
  );
};

export default JobApplicationsSection;
