import React from 'react';
import types from "@reactjs/enums/candidateStatus";
import FormikFieldSelect from "@reactjs/components/Input/FormikFieldSelect";

const options = types.map(type => ({
  value: type.id,
  label: type.friendly_name
}));

const CandidateStatusSelect = ({ ...props }) => {
  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

export default CandidateStatusSelect;
