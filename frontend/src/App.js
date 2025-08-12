import './App.css';
import theme from './theme';
import React, { useState } from 'react';

// MUI Components
import { ThemeProvider } from '@mui/material/styles';
import { Container, Box, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Custom Hooks and Components
import { useTerminals } from './hooks/useTerminals';
import Header from './components/Header';
import TerminalSelector from './components/TerminalSelector';

function App() {
  const [selectedValue, setSelectedValue] = useState('');
  const { items, loading, error } = useTerminals(); // Use the custom hook

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <Header />
        
        {/* Main Content Area */}
        <Container component="main" sx={{ pt: 6, maxWidth: '1400px' }}>
          
          {/* Terminal Dropdown, Start Date, End Date */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            {/* Terminal Dropdown */}
            <TerminalSelector 
              items={items}
              selectedValue={selectedValue}
              onChange={handleChange}
              loading={loading}
              error={error}
            />

            {/* Start Date Input */}
            <TextField
              id="startDate"
              label="Start Date"
              type="date"
              // value={startDate}
              // onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              variant="outlined"
            />

            {/* End Date Input */}
            <TextField
              id="endDate"
              label="End Date"
              type="date"
              // value={endDate}
              // onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              variant="outlined"
            />
          </Box>
          
          {/* Add components here that depend on the selectedValue */}
          <Box mt={4}>
            {selectedValue && <p>Selected Terminal ID: {selectedValue}</p>}
          </Box>

        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
