import './App.css';
import theme from './theme';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, TextField, Container, Box, Button, Checkbox, Snackbar, Alert, Modal, FormControlLabel, FormGroup, Stack, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import logo from './assets/cn.png';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <AppBar position="static" color="primary">
          <Toolbar sx={{ justifyContent: 'center', height: 60 }}>
            <img src={logo} alt="CN Logo" style={{"padding": 10}} />
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'left', fontWeight: 'bold' }}>
              Yard Process Analyzer
            </Typography>
          </Toolbar>
        </AppBar>


      </Box>
    </ThemeProvider>
  );
}

export default App;
