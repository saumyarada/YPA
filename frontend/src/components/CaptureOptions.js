import React from 'react';
import { Box, FormControlLabel, FormGroup, Checkbox, Radio, RadioGroup, FormControl, FormLabel, Button } from '@mui/material';

function CaptureOptions({
  dwellType,
  onDwellTypeChange,
  thruTrainCars,
  onCheckboxChange,
  onCapture,
  isLoading,
}) {
  return (
    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'space-between' }}>
      <FormControl>
        <FormLabel id="dwell-radio-buttons-group-label">Type of Dwell</FormLabel>
        <RadioGroup
          aria-labelledby="dwell-radio-buttons-group-label"
          name="radio-buttons-group"
          value={dwellType}
          onChange={onDwellTypeChange}
        >
          <FormControlLabel value="industry" control={<Radio />} label="Industry (CPA,LO,TR)" />
          <FormControlLabel value="process" control={<Radio />} label="Process (BOA,BOD,CPA,HOA,HOD,LO,STA,STD,TR)" />
        </RadioGroup>
      </FormControl>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1, justifyContent: 'space-evenly' }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={thruTrainCars} onChange={onCheckboxChange} />}
            label="Capture Cars on Through Trains (Rewheel Points Only)"
          />
        </FormGroup>
        <Button variant="contained" color="primary" onClick={onCapture} disabled={isLoading}>
          Capture
        </Button>
      </Box>
    </Box>
  );
}

export default CaptureOptions;