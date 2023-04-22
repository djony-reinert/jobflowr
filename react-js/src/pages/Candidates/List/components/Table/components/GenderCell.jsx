import React from 'react';
import types from "../../../../../../enums/gender";

const GenderCell = ({ id }) => {
  const gender = types.find(type => type.id === id);

  return (
    <span>{gender.friendly_name}</span>
  );
};

export default GenderCell;