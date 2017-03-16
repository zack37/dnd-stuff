import Glue from 'glue';

import db from './db';
import env from './env';
import pkg from '../package';
import router from './lib/router';

// api plugins
import spellsApi from './plugins/spellsApi';

const manifest = (router, database) => {
  const config = {
    apiRoot: '/api/v1',
    database,
    router
  };

  return {
    connections: [
      { port: env.self.apiPort, labels: ['api', 'spells'] }
      // { port: 8081, labels: ['web', 'app'] }
    ],

    registrations: [
      {
        plugin: {
          register: 'good',
          options: {
            ops: { interval: 1000 },
            reporters: {
              consoleReporter: [
                {
                  module: 'good-squeeze',
                  name: 'Squeeze',
                  args: [{ log: '*', response: '*', error: '*' }]
                },
                {
                  module: 'good-console'
                },
                'stdout'
              ]
            }
          }
        }
      },
      // { plugin: 'blipp' },
      { plugin: 'inert' },
      { plugin: 'vision' },
      {
        plugin: {
          register: 'tv',
          options: {
            host: 'localhost',
            endpoint: '/debug'
          }
        }
      },
      {
        plugin: {
          register: 'hapi-swaggered',
          options: {
            info: {
              title: pkg.name,
              description: pkg.description,
              version: pkg.version
            },
            tagging: {
              mode: 'tags'
            }
          }
        }
      },
      {
        plugin: {
          register: 'hapi-swaggered-ui',
          options: {
            title: pkg.name,
            path: '/docs'
          }
        }
      },
      spellsApi(config)
    ]
  };
};


const options = {
  relativeTo: __dirname
};

const tapP = fn => data => {
  return Promise.resolve().then(() => fn(data)).then(() => data);
};

export default db(env.mongo.connectionString)
  .then(db => Glue.compose(manifest(router, db), options)) 
  .then(tapP(server => server.initialize()))
  .then(tapP(server => {
    if(env.self.startServer) {
      return server.start()
        .then(() => server.log(['info'], `Server started on worker ${process.pid} at ${server.info.uri}`));
    }
  }))
  .catch(err => {
    return console.log(err.stack);
  });
