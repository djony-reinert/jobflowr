import React from 'react';
import types from "@reactjs/enums/jobType";
import FormikFieldSelect from "@reactjs/components/Input/FormikFieldSelect";

const options = types.map(type => ({
  value: type.id,
  label: type.friendly_name
}));

const JobTypeSelect = ({ ...props }) => {
  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

export default JobTypeSelect;