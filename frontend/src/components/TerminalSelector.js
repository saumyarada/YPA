// src/components/TerminalSelector.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Box, Skeleton } from '@mui/material';

const TerminalSelector = ({ items, selectedValue, onChange, loading, error }) => {
  return (
    // This Box is now the permanent container, always providing the flex properties.
    <Box sx={{ flex: 1 }}>
      {loading ? (
        // When loading, render the Skeleton INSIDE the box.
        <Skeleton variant="rounded" height={56} />
      ) : (
        // When not loading, render the real component INSIDE the box.
        <FormControl fullWidth error={!!error}>
          <InputLabel id="terminal-select-label">Terminal</InputLabel>
          <Select
            labelId="terminal-select-label"
            id="terminal-select"
            value={selectedValue}
            label="Terminal"
            onChange={onChange}
            disabled={error && items.length === 0}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 250,
                  width: 250,
                },
              },
            }}
          >
            {items.length === 0 && !error && (
              <MenuItem value="" disabled>
                <em>No terminals available</em>
              </MenuItem>
            )}
            {items.map((item) => (
              <MenuItem key={item.ID} value={item.TRML_NM}>
                {item.TRML_NM}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>Failed to load terminals.</FormHelperText>}
        </FormControl>
      )}
    </Box>
  );
};

export default TerminalSelector;
