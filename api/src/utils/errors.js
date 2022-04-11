const joiErrors = validate => {
  const messages = [];
  for (let field in validate.error.details) {
    messages.push(validate.error.details[field].message);
  }
  return messages;
};

const mongooseErrors = err => {
  const messages = [];
  for (let field in err.errors) {
    messages.push(err.errors[field].message);
  }
  return messages;
};

module.exports = { joiErrors, mongooseErrors };
