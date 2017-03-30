import Glue from 'glue';
import path from 'path';
import R from 'ramda';

import cache, { connections } from './lib/cache';
import db from './lib/db';
import env from './env';
import redis from './lib/redis';
// this is to avoid importing unnecessary properties in package.json
import { name, description, version } from '../package';
import plugins from './plugins';
import router from './lib/router';

const manifest = (router, database) => {
  const context = {
    apiRoot: '/api/v1',
    cache,
    connections,
    database,
    redis,
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
      { port: env.self.apiPort, labels: ['api'] }
      // { port: 8081, labels: ['web', 'app'] }
    ],

    registrations: [
      // non-configured, global plugins
      ...R.map(R.objOf('plugin'), ['inert', 'vision', './withPaging']),
      // non-clustered plugins
      ...(env.cluster.enabled ? [] : R.map(R.objOf('plugin'), ['blipp'])),
      // clusterd only plugins
      ...(env.cluster.enabled ? R.map(R.objOf('plugin'), []) : []),
      // configured plugins
      ...R.map(p => p(context), R.values(plugins))
    ]
  };
};

const options = {
  relativeTo: __dirname
};

const tapP = fn =>
  data => Promise.resolve().then(() => fn(data)).then(() => data);

const startupTime = process.hrtime();
export default db(env.mongo.connectionString)
  .then(db => Glue.compose(manifest(router, db), options))
  .then(tapP(server => server.initialize()))
  .then(
    tapP(server => {
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
  .then(
    tapP(server => {
      const [s, ns] = process.hrtime(startupTime);
      server.log(
        ['trace'],
        `Server took ${s * 1e3 + ns / 1e6 << 0} ms to startup`
      );
    })
  )
  .catch(err => {
    console.log(err.stack);
    return process.exit(1);
  });
