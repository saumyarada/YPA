import React from 'react';
import { Box, TextField } from '@mui/material';

function DateFilter({ startDate, endDate, onStartDateChange, onEndDateChange }) {
  return (
    <>
      <Box sx={{ flex: 1 }}>
        <TextField
          id="startDate"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={onStartDateChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <TextField
          id="endDate"
          label="End Date"
          type="date"
          value={endDate}
          onChange={onEndDateChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          variant="outlined"
        />
      </Box>
    </>
  );
}

export default DateFilter;
