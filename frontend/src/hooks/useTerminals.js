import { useState, useEffect } from 'react';

export const useTerminals = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/terminals/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setItems(result.data || []);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch terminals:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTerminals();
  }, []); // Empty dependency array means this effect runs once on mount

  return { items, loading, error };
};
