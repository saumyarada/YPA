// src/hooks/useCaptureForm.js
import { useState } from 'react';

export function useCaptureForm(initialValues) {
  const [terminal, setTerminal] = useState(initialValues?.terminal || '');
  const [thruTrainCars, setThruTrainCars] = useState(initialValues?.thruTrainCars || false);
  const [dwellType, setDwellType] = useState(initialValues?.dwellType || 'industry');

  const handleTerminalChange = (event) => {
    setTerminal(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setThruTrainCars(event.target.checked);
  };

  const handleDwellTypeChange = (event) => {
    setDwellType(event.target.value);
  };

  return {
    terminal,
    thruTrainCars,
    dwellType,
    handleTerminalChange,
    handleCheckboxChange,
    handleDwellTypeChange,
  };
}
