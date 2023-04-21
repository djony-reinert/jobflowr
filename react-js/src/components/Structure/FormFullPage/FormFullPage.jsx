import React from 'react';
import { Formik } from 'formik';
import { Box, Button, Typography } from '@mui/material';

const FormFullPageLayout = ({ title, actionButtonTitle, children, onCancel }) => {
  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box>
        {children}
      </Box>
      <FormFullPageFooter actionButtonTitle={actionButtonTitle} onCancel={onCancel} />
    </Box>
  );
}

const FormFullPageFooter = ({ actionButtonTitle, onCancel }) => {
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
      <Button variant="contained" color="primary" size="large" >{actionButtonTitle}</Button>
    </Box>
  );
}
const FormFullPage = ({ title, actionButtonTitle, initialValues, validationSchema, onSubmit, onCancel, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <FormFullPageLayout title={title} actionButtonTitle={actionButtonTitle} onCancel={onCancel}>
          {children}
        </FormFullPageLayout>
      )}
    </Formik>
  );
}

export default FormFullPage;
