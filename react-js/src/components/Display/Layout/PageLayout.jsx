import React from 'react';
import { Helmet } from "react-helmet-async";
import { Box, Grid, Typography } from "@mui/material";

const PageLayout = ({ title, actions, children }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Helmet>
        <title> {title} | JobFlowr </title>
      </Helmet>

      <Box
        sx={{ px: 2, display: 'flex', alignItems: 'center' }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">
            {title}
          </Typography>
        </Box>
        {actions && (
          <Box>
            <Grid container columnSpacing={actions?.length > 1 ? 2 : 0}>
              {actions.map((action, index) => (
                <Grid item key={index}>
                  {action}
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

PageLayout.propTypes = {};

PageLayout.defaultProps = {};

export default PageLayout;