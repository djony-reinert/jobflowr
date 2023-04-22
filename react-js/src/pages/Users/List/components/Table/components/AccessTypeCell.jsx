import React from 'react';
import PropTypes from 'prop-types';
import types from "../../../../../../enums/accessType";

const AccessTypeCell = ({ id }) => {
  const accessType = types.find(type => type.id === id);

  return (
    <span>{accessType.friendly_name}</span>
  );
};

AccessTypeCell.propTypes = {
  id: PropTypes.number.isRequired,
};

export default AccessTypeCell;
