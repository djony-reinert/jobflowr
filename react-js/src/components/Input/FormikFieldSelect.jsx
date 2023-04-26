import React from 'react';
import { useField } from 'formik';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

const FormikFieldSelect = ({ name, label: labelProp, options, onChange: customOnChange, ...props }) => {
  const [field] = useField(name);
  field.value = field.value || '';

  const selectOptions = [{ label: '- select -', value: '' }, ...options];

  const handleChange = (event) => {
    const { value } = event.target;
    const option = options?.find((opt) => opt.value === value);
    const newValue = option ? option.value : '';
    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    };
    field.onChange(newEvent);

    if (typeof customOnChange === 'function') {
      customOnChange(newEvent);
    }
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{labelProp}</InputLabel>
      <Select
        {...field}
        {...props}
        label={labelProp}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            }
          }
        }}
      >
        {selectOptions?.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))};
      </Select>
    </FormControl>
  );
};

export default FormikFieldSelect;

FormikFieldSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  onChange: PropTypes.func
};

FormikFieldSelect.defaultProps = {
  options: [],
  onChange: null
};
