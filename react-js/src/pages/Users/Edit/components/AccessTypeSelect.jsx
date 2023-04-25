import React from 'react';
import FormikFieldSelect from "../../../../components/Input/FormikFieldSelect";
import types from "../../../../enums/accessType";

const options = types.map(type => ({
  value: type.id,
  label: type.friendly_name
}));

const AccessTypeSelect = ({ ...props }) => {
  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

export default AccessTypeSelect;