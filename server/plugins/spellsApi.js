/**
 * @param {Object} config configuration Object
 * @param {Object} config.router 
 * @param {Object} config.database Initialized database instance
 * @param {String} config.apiRoot Route prefix of api
 */
export default ({ router, database, apiRoot }) => ({
  plugin: {
    register: './api/spells',
    options: {
      router,
      database
    }
  },
  options: {
    select: ['api', 'spells'],
    routes: { prefix: `${apiRoot}/spells` }
  }
});
