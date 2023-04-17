import { useState, useEffect } from 'react';

const useFetchData = ({ endpoint, onSuccess, onError}) => {
  const [connData, setConnData] = useState(null);
  const [connError, setConnError] = useState(null);
  const [connLoading, setConnLoading] = useState(false);

  useEffect(() => {
    setConnLoading(true);

    fetch(`http://localhost:3000/api/${endpoint}`)
      .then(response => response.json())
      .then(data => {
        setConnData(data);
        setConnLoading(false);
        if (onSuccess) onSuccess(data);
      })
      .catch(error => {
        setConnError(error);
        setConnLoading(false);
        if (onError) onError(error);
      });
  }, [endpoint, onSuccess, onError]);

  return { connData, connError, connLoading };
};

export default useFetchData;