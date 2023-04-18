import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from '../../theme';
import { StyledChart } from '../../components/chart';
import ScrollToTop from '../../components/scroll-to-top';
import RoutesConfig from "../../Router/RoutesConfig";

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <RoutesConfig />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;