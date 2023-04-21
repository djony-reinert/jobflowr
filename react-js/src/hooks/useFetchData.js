import { useState } from "react";

const useFetchData = () => {
  const [connData, setConnData] = useState(null);
  const [connError, setConnError] = useState(null);
  const [connLoading, setConnLoading] = useState(true);

  const doFetch = ({ endpoint, method, data, onSuccess, onError }) => {
    const abortController = new AbortController();

    fetch(`http://localhost:3000/api${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

  return { connData, connError, connLoading, doFetch };
};

export default useFetchData;
