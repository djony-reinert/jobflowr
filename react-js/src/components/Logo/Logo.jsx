import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';
import { ReactComponent as SvgLogo } from "./assets/logo.svg";

const Logo = () => {
  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      <Box
        sx={{ width: '100%', height: 40, maxWidth: 300, cursor: 'pointer', color: [12, 95, 133] }}
      >
        <SvgLogo/>
      </Box>
    </Link>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
