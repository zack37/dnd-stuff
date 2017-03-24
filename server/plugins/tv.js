export default ({ apiRoot }) => ({
  plugin: {
    register: 'tv',
    options: {
      host: 'localhost',
      endpoint: `${apiRoot}/debug`
    }
  },
  options: {
    select: ['api']
  }
});
