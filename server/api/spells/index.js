import db from './db';

const plugin = {
  register: (server, options, next) => {
    if (!options) {
      return next(new Error('Spells plugin must be initialized with options'));
    }

    const { router, database } = options;

    return server
      .register([router(__dirname)])
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
