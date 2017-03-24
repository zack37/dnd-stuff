import Glue from 'glue';
import path from 'path';
import R from 'ramda';

import db from './db';
import env from './env';
// this is to avoid importing unnecessary properties in package.json
import { name, description, version } from '../package';
import plugins from './plugins';
import router from './lib/router';

const manifest = (router, database) => {
  const config = {
    apiRoot: '/api/v1',
    database,
    description,
    name,
    router,
    version
  };

  return {
    server: {
      connections: {
        router: {
          stripTrailingSlash: true
        },
        routes: {
          files: {
            relativeTo: path.join(__dirname, 'public')
          }
        }
      }
    },

    connections: [
      { port: env.self.apiPort, labels: ['api'] },
      // { port: 8081, labels: ['web', 'app'] }
    ],

    registrations: [
      // non-configured, global plugins
      ...R.map(R.objOf('plugin'), ['inert', 'vision']),
      // non-clustered plugins 
      ...env.self.isClustered ? [] : R.map(R.objOf('plugin'), ['blipp']),
      // clusterd only plugins
      ...env.self.isClustered ? R.map(R.objOf('plugin'), []) : [],
      // configured plugins
      ...R.map(p => p(config), R.values(plugins))
    ]
  };
};

const options = {
  relativeTo: __dirname
};

const tapP = fn =>
  data => Promise.resolve().then(() => fn(data)).then(() => data);

export default db(env.mongo.connectionString)
  .then(db => Glue.compose(manifest(router, db), options))
  .then(tapP(server => server.initialize()))
  .then(tapP(server => {
    if (env.self.startServer) {
      return server.start().then(() => {
        return server.connections.map(con =>
          server.log(
            ['info'],
            `Server started on worker ${process.pid} at ${con.info.uri}`
          ));
      });
    }
  })
  )
  .catch(err => {
    console.log(err.stack);
    return process.exit(1);
  });
