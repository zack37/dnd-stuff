export default ({ apiRoot, name }) => ({
  plugin: {
    register: 'hapi-swaggered-ui',
    options: {
      title: name,
      path: `${apiRoot}/docs`,
      swaggerEndpoint: `${apiRoot}/swagger`
    }
  },
  options: {
    select: ['api']
  }
});
