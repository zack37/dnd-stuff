/**
 * @param {Object} config configuration Object
 * @param {String} config.apiRoot Route prefix of api
 * @param {Object} config.cache Cache implementation
 * @param {Object} config.connections Cache connection dictionary
 * @param {Object} config.database Initialized database instance
 * @param {Object} config.router 
 */
export default ({ apiRoot, cache, connections, database, router }) => ({
  plugin: {
    register: './api/spells',
    options: {
      cache: cache(connections.SPELLS),
      database,
      router
    }
  },
  options: {
    select: ['api', 'spells'],
    routes: { prefix: `${apiRoot}/spells` }
  }
});
