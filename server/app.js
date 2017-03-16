import Glue from 'glue';
import hapiRouter from 'hapi-router';

import db from './db';
import env from './env';
import pkg from '../package';

const apiRoot = '/api/v1';

const router = dirname => {
  if(!dirname) {
    throw new Error('dirname must be provided to register routes');
  }

  return {
    register: hapiRouter,
    options: {
      routes: 'routes/*.js',
      cwd: dirname
    }
  };
};

const manifest = (router, database) => ({

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
    {
      plugin: {
        register: './api/spells',
        options: {
          routePrefix: `${apiRoot}/spells`,
          router,
          database
        }
      },
      options: {
        select: ['api', 'spells']
      }
    }
  ]

});

const options = {
  relativeTo: __dirname
};

const tapP = fn => data => {
  return fn(data).then(() => data);
};

export default db(env.mongo.connectionString)
  .then(db => Glue.compose(manifest(router, db), options)) 
  .then(tapP(server => server.initialize()))
  .then(tapP(server => {
    if(env.self.startServer) {
      return server.start()
        .then(() => server.log(['info'], `Server started on worker ${process.pid}`));
    }
  }))
  .catch(err => {
    return console.log(err.stack);;
  });
