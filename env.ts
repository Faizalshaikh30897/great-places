const variables = {
  development: {
      googleAPIKey: ''
  },
  production: {
      googleAPIKey: ''
  }
};

const getEnvVariables = () => {
  if (__DEV__) {
      return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; 
