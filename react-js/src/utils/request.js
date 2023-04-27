const request = async (
  endpoint,
  data,
  method,
  onSuccess = () => {},
  onError = () => {}
) => {
  const abortController = new AbortController();

  try {
    const response = await fetch(`http://localhost:3000/api${endpoint}`, {
      method,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      signal: abortController.signal,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();

    onSuccess(jsonResponse);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }

  return () => {
    abortController.abort();
  };
};

export default request;
