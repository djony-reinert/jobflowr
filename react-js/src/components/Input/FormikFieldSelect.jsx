import React from 'react';
import { useField } from 'formik';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const FormikFieldSelect = ({ name, label: labelProp, options, ...props }) => {
  const [field] = useField(name);

  const selectOptions = [{ label: '- select -', value: '' }, ...options];

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{labelProp}</InputLabel>
      <Select
        {...field}
        {...props}
        label={labelProp}
        onChange={(event) => {
          const { value } = event.target;
          const option = options.find((opt) => opt.value === value);
          const newValue = option ? option.value : '';
          const newEvent = {
            ...event,
            target: {
              ...event.target,
              value: newValue,
            },
          };
          field.onChange(newEvent);
        }}
      >
        {selectOptions.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormikFieldSelect;
