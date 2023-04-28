import React from 'react';
import FormikFieldSelect from "../../../../components/Input/FormikFieldSelect";
import types from "../../../../enums/jobRemoteType";

const options = types.map(type => ({
  value: type.id,
  label: type.friendly_name
}));

const RemoteTypeSelect = ({ ...props }) => {
  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

export default RemoteTypeSelect;
