import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <div className="App">
      <Stack direction="row" spacing={1}>
        <Chip label="Chip Filled" />
        <Chip label="Chip Outlined" variant="outlined" />
      </Stack>
    batata
    </div>
  );
}

export default App;
