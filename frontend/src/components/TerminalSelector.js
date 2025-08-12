import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const TerminalSelector = ({ items, selectedValue, onChange, loading, error }) => {
  if (loading) {
    return <p>Loading terminals...</p>;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="terminal-select-label">Terminal</InputLabel>
      <Select
        labelId="terminal-select-label"
        id="terminal-select"
        value={selectedValue}
        label="Terminal"
        onChange={onChange}
        disabled={loading || error}
        MenuProps={{
            PaperProps: {
                style: {
                  maxHeight: 250,
                  width: 250,
                },
            },
        }}
      >
        {items.map((item) => (
          <MenuItem 
            key={item.ID} 
            value={item.ID}
          >
            {item.TRML_NM}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>Failed to load terminals.</FormHelperText>}
    </FormControl>
  );
};

export default TerminalSelector;
