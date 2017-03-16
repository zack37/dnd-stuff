import hapiRouter from 'hapi-router';

export default dirname => {
  if(!dirname) {
    throw new Error('dirname must be provided to register routes');
  }

  return {
    register: hapiRouter,
    options: {
      routes: 'routes/*.js',
      cwd: dirname
    }
  };
};
