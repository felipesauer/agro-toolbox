import { useState, useCallback } from 'react';
import client from '../api/client';

export function useCalculation(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculate = useCallback(async (inputs) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.post(endpoint, inputs);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, calculate, reset };
}
