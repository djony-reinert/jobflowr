import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import PageLayout from "../../Display/Layout/PageLayout";

const FormFullPageLayout = ({ title, actionButtonTitle, children, onCancel, isSubmitting }) => {
  return (
    <PageLayout title={title}>
      <Form>
        <Box>
          {children}
        </Box>
        <FormFullPageFooter actionButtonTitle={actionButtonTitle} onCancel={onCancel} isSubmitting={isSubmitting} />
      </Form>
    </PageLayout>
  );
}

const FormFullPageFooter = ({ actionButtonTitle, onCancel, isSubmitting }) => {
  return (
    <Box sx={{
      px: 4,
      py: 2,
      zIndex: '1',
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      bgcolor: '#f4f4f4',
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      <Button variant="outlined" size="large" sx={{ mr: 2 }} onClick={onCancel}>Cancel</Button>
      <LoadingButton
        loading={isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
      >
        {actionButtonTitle}
      </LoadingButton>
    </Box>
  );
}
const FormFullPage = ({ title, actionButtonTitle, initialValues, onSubmit, onCancel, children }) => {
  const onSubmitProxy = useCallback((values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  }, [onSubmit]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitProxy}
    >
      {({ isSubmitting }) => (
        <FormFullPageLayout title={title} actionButtonTitle={actionButtonTitle} onCancel={onCancel} isSubmitting={isSubmitting}>
          {children}
        </FormFullPageLayout>
      )}
    </Formik>
  );
}

export default FormFullPage;
