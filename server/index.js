import 'source-map-support/register';

import cluster from 'cluster';
import os from 'os';
import R from 'ramda';

import env from './env';

const numCPUs = os.cpus().length;

if (env.self.isClustered && cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  R.times(cluster.fork, numCPUs);

  cluster.on('exit', (worker /*, code, signal*/) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  module.exports = require('./app');
}
