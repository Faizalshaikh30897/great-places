const variables = {
  development: {
      googleAPIKey: 'AIzaSyAKwCkEJTzWuDzLrMKa0Iirjhlcsg0FKHc'
  },
  production: {
      googleAPIKey: 'AIzaSyAKwCkEJTzWuDzLrMKa0Iirjhlcsg0FKHc'
  }
};

const getEnvVariables = () => {
  if (__DEV__) {
      return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; 