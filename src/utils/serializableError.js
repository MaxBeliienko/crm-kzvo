const createSerializableError = error => ({
  message: error.message,
  name: error.name,
  code: error.code,
  response: error.response
    ? {
        status: error.response.status,
        data: error.response.data,
      }
    : undefined,
});

export default createSerializableError;
