import db from './db';

const plugin = {
  register: (server, options, next) => {
    if (!options) {
      throw new Error('Plugin must be initialized with options');
    }

    const { router, routePrefix, database } = options;

    return server
      .register([router(__dirname)], {
        routes: { prefix: routePrefix }
      })
      .then(() => db(database))
      .then(next)
      .catch(next);
  }
};

plugin.register.attributes = {
  name: 'spells',
  once: true
};

export default plugin;
