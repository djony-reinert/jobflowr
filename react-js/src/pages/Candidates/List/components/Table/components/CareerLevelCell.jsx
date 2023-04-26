import React from 'react';
import types from "@reactjs/enums/careerLevel";

const CareerLevelCell = ({ id }) => {
  const careerLevel = types.find(type => type.id === id);

  return (
    <span>{careerLevel.friendly_name}</span>
  );
};

export default CareerLevelCell;