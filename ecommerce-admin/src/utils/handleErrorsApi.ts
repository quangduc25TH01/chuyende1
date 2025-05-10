const handleErrorsApi = (error: any): string => {
  const message =
    error?.response?.data?.message || error.message || 'Something went wrong';

  return message;
};

export default handleErrorsApi;
