import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../assets/cn.png'; // Make sure the path to your logo is correct

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'center', height: 60 }}>
        <img src={logo} alt="CN Logo" style={{"padding": 10, height: '50px'}} />
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'left', fontWeight: 'bold' }}>
          Yard Process Analyzer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
