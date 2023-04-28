import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FormikFieldSelect from "@reactjs/components/Input/FormikFieldSelect";

const UserSelect = ({ users, ...props }) => {
  const options = useMemo(() => {
    return users?.map(user => ({
      value: user.id,
      label: user.first_name + ' ' + user.last_name
    }));
  }, [users]);

  return (
    <FormikFieldSelect options={options} {...props} />
  );
};

UserSelect.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({}))
};

UserSelect.defaultProps = {
  users: []
};

export default UserSelect;
