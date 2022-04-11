const Errors = errors => {
  let errorMessage = '';
  for (let i = 0; i < Object.keys(errors).length; i++) {
    errorMessage += errors[i] + ' ';
  }
  return errorMessage;
};

export default Errors;
