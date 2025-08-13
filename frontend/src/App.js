// src/App.js
import './App.css';
import theme from './theme';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Hooks and Utils
import { useTerminals } from './hooks/useTerminals';
import { useCaptureForm } from './hooks/useCaptureForm';
import { captureTrainData } from './utils/api';

// Components
import Header from './components/Header';
import TerminalSelector from './components/TerminalSelector';
import DateFilter from './components/DateFilter';
import CaptureOptions from './components/CaptureOptions';

function App() {
  // Terminal Dropdown, Start/End Dates
  const { terminals, loading, error, startDate, endDate, setStartDate, setEndDate } = useTerminals();
  
  // Checkbox, Radio Buttons, Capture Button
  const { terminal, thruTrainCars, dwellType, handleTerminalChange, handleCheckboxChange, handleDwellTypeChange } = useCaptureForm();

  // The final action handler, now clean and focused
  const handleCapture = () => {
    captureTrainData({
      start_date: startDate,
      end_date: endDate,
      dwell_type: dwellType,
      terminal,
      enabled: thruTrainCars ? "1" : "0",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <Box component="main" sx={{ pt: 6, maxWidth: '1000px', mx: 'auto', px: 1 }}>
          {/* Top filter section */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <TerminalSelector 
              items={terminals}
              selectedValue={terminal}
              onChange={handleTerminalChange}
              loading={loading}
              error={error}
            />
            <DateFilter 
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={(e) => setStartDate(e.target.value)}
              onEndDateChange={(e) => setEndDate(e.target.value)}
            />
          </Box>

          {/* Use the new, self-contained component */}
          <CaptureOptions
            dwellType={dwellType}
            onDwellTypeChange={handleDwellTypeChange}
            thruTrainCars={thruTrainCars}
            onCheckboxChange={handleCheckboxChange}
            onCapture={handleCapture}
          />

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
