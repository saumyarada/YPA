// src/hooks/useTerminals.js
import { useState, useEffect } from 'react';
import { getTerminals } from '../utils/api';

export function useTerminals() {
  const [terminals, setTerminals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getTerminals();
        setTerminals(result.data || []);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch terminals:", e);
      } finally {
        // setTimeout(() =>{
        setLoading(false);
        // }, 5000)
      }
    };

    setStartDate(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]);
    setEndDate(new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]);

    fetchTerminals();
  }, []); // Run on mount

  return { terminals, loading, error, startDate, endDate, setStartDate, setEndDate };
}