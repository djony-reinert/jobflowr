const request = async (endpoint, data, method, onSuccess = () => {}, onError = () => {}) => {
  const abortController = new AbortController();

  fetch(`http://localhost:3000/api${endpoint}`, {
    method,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    signal: abortController.signal,
  })
    .then((response) => response.json())
    .then((response) => {
      if (onSuccess) onSuccess(response);
      abortController.abort();
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        if (onError) onError(error);
      }
    });

  return () => {
    abortController.abort();
  };
};

export default request;