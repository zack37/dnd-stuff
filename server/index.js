// NOT USED FOR LOCAL DEVELOPMENT. ONLY FOR DEPLOYED INSTANCES

import 'source-map-support/register';

import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  let i = 0;

  for (; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker /*, code, signal*/) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  module.exports = require('./app');
}
