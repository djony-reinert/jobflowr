import { useState } from "react";

const useFetchData = ({ startConnLoading = true } = {}) => {
  const [connData, setConnData] = useState(null);
  const [connError, setConnError] = useState(null);
  const [connLoading, setConnLoading] = useState(startConnLoading);

  const doFetch = (endpoint, onSuccess, onError) => {
    const abortController = new AbortController();

    fetch(`http://localhost:3000/api${endpoint}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((response) => {
        setConnData(response);
        setConnLoading(false);

        if (onSuccess) onSuccess(response);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setConnError(error);
          setConnLoading(false);

          if (onError) onError(error);
        }
      });

    return () => {
      abortController.abort();
    };
  };

  return { connData, connError, connLoading, doFetch, setConnLoading };
};

export default useFetchData;
