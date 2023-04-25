import React from 'react';
import MuiLinearProgress from '@mui/material/LinearProgress';
import styled from '@emotion/styled'

const StyledLinearProgress = styled(MuiLinearProgress)`
  top: 0px;
  left: 0px;
  width: 100%;
  position: fixed;
  z-index: 2000;
`

const LinearProgress = () => {
  return <StyledLinearProgress />;
};

export default LinearProgress;