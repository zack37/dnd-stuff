import Promise from 'bluebird';

import db from './db';
import cacheSetup from './cache';

const plugin = {
  register: (server, options, next) => {
    if (!options) {
      return next(new Error('Spells plugin must be initialized with options'));
    }

    const { cache, database, router } = options;

    // just to wrap it into a bluebird promise for asCallback
    return Promise.resolve()
      .then(() => server.register([router(__dirname)]))
      .then(() => Promise.join(
        db(database),
        cacheSetup(cache)
      ))
      .asCallback(next);
  }
};

plugin.register.attributes = {
  name: 'spells',
  once: true
};

export default plugin;
