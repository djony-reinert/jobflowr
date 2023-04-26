import React from 'react';
import types from "@reactjs/enums/careerLevel";
import FormikFieldSelect from "@reactjs/components/Input/FormikFieldSelect";

const options = types.map(type => ({
  value: type.id,
  label: type.friendly_name
}));

const CareerLevelSelect = ({ ...props }) => {
  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

export default CareerLevelSelect;