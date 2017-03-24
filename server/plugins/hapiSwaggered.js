export default ({ apiRoot, description, name, version }) => ({
  plugin: {
    register: 'hapi-swaggered',
    options: {
      endpoint: `${apiRoot}/swagger`,
      stripPrefix: apiRoot,
      info: {
        title: name,
        description,
        version
      },
      tagging: {
        mode: 'tags'
      }
    }
  },
  options: {
    select: ['api']
  }
});
