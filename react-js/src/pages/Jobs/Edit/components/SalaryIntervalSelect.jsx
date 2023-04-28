import React from 'react';
import FormikFieldSelect from "../../../../components/Input/FormikFieldSelect";
import types from "../../../../enums/salaryInterval";

const options = types.map(type => ({
  value: type.friendly_name,
  label: type.friendly_name
}));

const SalaryIntervalSelect = ({ ...props }) => {
  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

export default SalaryIntervalSelect;
