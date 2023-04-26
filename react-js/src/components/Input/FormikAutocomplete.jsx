import React from 'react';
import { Autocomplete } from '@mui/material';
import FormikFieldText from "@reactjs/components/Input/FormikFieldText";
import { useField } from "formik";

const FormikAutocomplete = ({ label, name, options, handleOnChange, ...props }) => {
  const [field] = useField({ name });

  return (
    <Autocomplete
      {...field}
      options={options}
      onChange={handleOnChange}
      renderInput={params => (
        <FormikFieldText {...params} name={name} label={label} />
      )}
      {...props}
    />
  );
};

export default FormikAutocomplete;
