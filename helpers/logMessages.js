module.exports = {
  logMessage: message => {
    console.log(`${new Date().toString()} - ${JSON.stringify(message)}`);
  },
  errorMessage: message => {
    console.error(`${new Date().toString()} - ${JSON.stringify(message)}}`);
  }
};
