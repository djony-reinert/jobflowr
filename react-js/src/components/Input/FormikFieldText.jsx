import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

const FormikFieldText = ({ label, name, ...props }) => {
  const [field] = useField({ name });
  field.value = field.value || '';

  return (
    <TextField
      label={label}
      {...field}
      {...props}
    />
  );
};

export default FormikFieldText;
