// src/App.js
import './App.css';
import theme from './theme';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { DataGrid } from '@mui/x-data-grid';

// Constants
import {
  columnsCarsProcessed,
} from './utils/constants';

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

  const [currentRows, setCurrentRows] = useState([]);
  const [currentColumns, setCurrentColumns] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // The final action handler, now clean and focused
  const handleCapture = async () => {
    setIsLoading(true)
    setIsVisible(true);
    
    const apiResult = await captureTrainData({
      start_date: startDate,
      end_date: endDate,
      dwell_type: dwellType,
      terminal,
      enabled: thruTrainCars ? "1" : "0",
    });

    setCurrentColumns(columnsCarsProcessed)
    setCurrentRows(apiResult.data || [])
    setIsLoading(false)
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
    
        <Box sx={{ flexGrow: 1, p: 1, minHeight: 0, justifyContent: 'center', alignItems: 'center', display: isVisible ? 'flex' : 'none' }}> 
          <div style={{ height: '95%', width: '90%' }}> {/* Set explicit height for DataGrid */}
            <DataGrid
              rows={currentRows}
              columns={currentColumns}
              getRowId={(row) => row.ID}
              pageSize={5}
              // checkboxSelection
              disableRowSelectionOnClick
              loading={isLoading}
              slotProps={{
                loadingOverlay: {
                  variant: 'linear-progress', // or 'skeleton', 'linear-progress'
                  noRowsVariant: 'linear-progress',
                },
              }}
              initialState={{
                columns: {
                  columnVisibilityModel: { ID: false } // Hide Fields
                },
                // sorting: {
                //   sortModel: [{ field: 'STN_ID_333_FRM', sort: 'asc' }],
                // },
              }}
              showToolbar
            />
          </div>
          {/* <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
          <Button onClick={() => handleExport(prevSelection)} sx={{ mt: 2 }} variant="contained" color="primary">Export to Excel</Button> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
