import React from 'react';
import FormikFieldSelect from "@reactjs/components/Input/FormikFieldSelect";
import types from "@reactjs/enums/gender";

const options = types.map(type => ({
  value: type.id,
  label: type.friendly_name
}));

const GenderSelect = ({ ...props }) => {
  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

export default GenderSelect;
