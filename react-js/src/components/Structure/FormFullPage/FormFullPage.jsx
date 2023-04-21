import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";

const FormFullPageLayout = ({ title, actionButtonTitle, children, onCancel, isSubmitting }) => {
  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h4">
        {title}
      </Typography>
      <Form>
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
        <FormFullPageFooter actionButtonTitle={actionButtonTitle} onCancel={onCancel} isSubmitting={isSubmitting} />
      </Form>
    </Box>
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
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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
