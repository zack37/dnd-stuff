/**
 * @param {Object} config configuration Object
 * @param {Object} config.router 
 * @param {Object} config.database Initialized database instance
 * @param {String} config.apiRoot Route prefix of api
 */
export default config => ({
  plugin: {
    register: './api/spells',
    options: {
      router: config.router,
      database: config.database
    }
  },
  options: {
    select: ['api', 'spells'],
    routes: { prefix: `${config.apiRoot}/spells` }
  }
});
