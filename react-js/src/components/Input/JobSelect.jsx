import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FormikFieldSelect from "@reactjs/components/Input/FormikFieldSelect";

const JobSelect = ({ jobs, ...props }) => {
  const options = useMemo(() => {
    return jobs?.map(job => ({
      value: job.id,
      label: job.title
    }));
  }, [jobs]);

  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

JobSelect.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({}))
};

JobSelect.defaultProps = {
  jobs: []
};

export default JobSelect;
