import React from 'react';
import FormikFieldSelect from "@reactjs/components/Input/FormikFieldSelect";
import types from "@reactjs/enums/degree";

const options = types.map(type => ({
  value: type.id,
  label: type.friendly_name
}));

const DegreeSelect = ({ ...props }) => {
  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

export default DegreeSelect;