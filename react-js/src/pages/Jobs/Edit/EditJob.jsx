import React, { useMemo } from 'react';
import { Form } from 'formik';
import { FormControl, Grid } from '@mui/material';
import FormFullPage from "../../../components/Structure/FormFullPage/FormFullPage";
import { useParams } from 'react-router-dom';
import FormikFieldText from "../../../components/Input/FormikFieldText";
import FormikFieldSelect from "../../../components/Input/FormikFieldSelect";

const EditJob = () => {
  const { id } = useParams();

  const initialValues = useMemo(() => {
    return {}
  }, [id]);

  return (
    <FormFullPage
      initialValues={initialValues}
      onSubmit={() => {}}
      onCancel={() => {}}
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
              <FormikFieldSelect name='department_id' label='Department' options={[]} />
            </Grid>
            <Grid item xs={6}>
              <FormikFieldSelect name='remote_type_id' label='Remote Work' options={[]} />
            </Grid>
          </Grid>
        </FormControl>

        <FormControl fullWidth>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormikFieldSelect name='salary_interval' label='Salary Interval' options={[]} />
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