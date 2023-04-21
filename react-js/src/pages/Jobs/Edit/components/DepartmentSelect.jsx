import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FormikFieldSelect from "../../../../components/Input/FormikFieldSelect";

const DepartmentSelect = ({ departments, ...props }) => {
  const options = useMemo(() => {
    return departments?.map(department => ({
      value: department.id,
      label: department.name
    }));
  }, [departments]);

  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

DepartmentSelect.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({}))
};

DepartmentSelect.defaultProps = {
  departments: []
};

export default DepartmentSelect;