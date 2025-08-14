import './App.css';
import theme from './theme';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { DataGrid } from '@mui/x-data-grid';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// Constants
import {
  columnsCarsProcessed,
} from './utils/constants';

// Hooks and Utils
import { useTerminals } from './hooks/useTerminals';
import { useCaptureForm } from './hooks/useCaptureForm';
import { captureCarData } from './utils/api';

// Components
import Header from './components/Header';
import TerminalSelector from './components/TerminalSelector';
import DateFilter from './components/DateFilter';
import CaptureOptions from './components/CaptureOptions';



// npx watch 'npm run build' ./src
// myenv\Scripts\activate
// python manage.py runserver

function App() {
  // Terminal Dropdown, Start/End Dates
  const { terminals, loading, error, startDate, endDate, setStartDate, setEndDate } = useTerminals();
  
  // Checkbox, Radio Buttons, Capture Button
  const { terminal, thruTrainCars, dwellType, handleTerminalChange, handleCheckboxChange, handleDwellTypeChange } = useCaptureForm();

  const [currentRows, setCurrentRows] = useState([]);
  const [currentColumns, setCurrentColumns] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleGrid, setIsVisibleGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // The final action handler, now clean and focused
  const handleCapture = async () => {
    setIsLoading(true);
    setIsVisible(true);
    setIsVisibleGrid(true);
    
    const apiResult = await captureCarData({
      start_date: startDate,
      end_date: endDate,
      dwell_type: dwellType,
      terminal,
      enabled: thruTrainCars ? "1" : "0",
    });

    setCurrentColumns(columnsCarsProcessed);
    setCurrentRows(apiResult.data || []);
    setIsLoading(false);
  };

  const handleToggleGridVisibility = () => {
    setIsVisibleGrid(prev => !prev); 
  };
  
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Processed Cars');

    // Define columns in the worksheet
    worksheet.columns = currentColumns.map(col => ({
      header: col.headerName,
      key: col.field,
      width: 20
    }));

    // Add the rows from your DataGrid
    worksheet.addRows(currentRows);

    // Generate the file and trigger the download
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'CarsProcessed.xlsx');
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
            isLoading={isLoading}
          />

          <Box sx={{ display: isVisible ? 'flex' : 'none', flexDirection: 'row', gap: 3, flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Button sx={{ mt: 2 }} variant="contained" color="primary" disabled={isLoading} onClick={ handleExport }>Export to Excel</Button>
            <Button onClick={handleToggleGridVisibility} sx={{ mt: 2 }}>{isVisibleGrid ? 'Close' : 'Open'}</Button>  
          </Box>
        </Box>
    
        <Box sx={{ flexGrow: 1, p: 1, minHeight: 0, justifyContent: 'center', alignItems: 'center', display: isVisibleGrid ? 'flex' : 'none' }}> 
          <div style={{ height: '95%', width: '90%' }}> 
            <DataGrid
              rows={currentRows}
              columns={currentColumns}
              getRowId={(row) => row.ID}
              pageSize={5}
              disableRowSelectionOnClick
              loading={isLoading}
              slotProps={{
                loadingOverlay: {
                  variant: 'linear-progress', // or 'skeleton'
                  noRowsVariant: 'linear-progress',
                },
              }}
              initialState={{
                columns: {
                  columnVisibilityModel: { ID: false } // Hide Fields
                },
              }}
              showToolbar
            />
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
