import React, { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CandidateProgressByJob from "./components/CandidateProgressByJob";
import PageLayout from "@reactjs/components/Display/Layout/PageLayout";
import useFetchData from "@reactjs/hooks/useFetchData";
import LinearProgress from "@reactjs/components/Feedback/LinearProgress";
import JobApplicationByStatus from "@reactjs/pages/Reports/components/JobApplicationByStatus";
import JobOpeningsByDepartment from "@reactjs/pages/Reports/components/JobOpeningsByDepartment";
import { API_REPORTS } from "@reactjs/endpoints";

function ReportsPage() {
  const { connLoading, connData, doFetch } = useFetchData();

  useEffect(() => {
    doFetch(API_REPORTS());
  }, []);

  if (connLoading) {
    return <LinearProgress />
  }

  return (
    <PageLayout title='Reports'>
      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="candidate-progress" id="candidate-progress">
              <Typography variant="h6">Candidate Progress by Job</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CandidateProgressByJob data={connData?.candidate_progress_report_by_job} />
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="job-applications" id="job-applications">
              <Typography variant="h6">Job Application by Status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <JobApplicationByStatus data={connData?.job_application_report_by_status} />
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="job-openings" id="job-openings">
              <Typography variant="h6">Job Openings by Department</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <JobOpeningsByDepartment data={connData?.job_openings_report_by_department} />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default ReportsPage;
