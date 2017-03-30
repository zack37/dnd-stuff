import 'source-map-support/register';

import cluster from 'cluster';
import R from 'ramda';

import env from './env';

function fork(retries = 0) {
  const worker = cluster.fork();
  worker.on('exit', (code, signal) => {
    if (code === 0 && !signal) {
      return console.log(`worked ${worker.process.pid} exited normally`);
    }

    if (code !== 0) {
      console.log(`worker ${worker.process.pid} exited with code: ${code}`);
    } else if (signal) {
      console.log(`worker ${worker.process.pid} killed by signal: ${signal}`);
    }
    if (retries < env.cluster.retryCount) {
      console.log('Restarting...');
      return fork(retries + 1);
    }
    throw new Error('App restart limit reached');
  });
}

function balance() {
  if (env.cluster.enabled && cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    R.times(fork, env.cluster.maxWorkers);
  } else {
    return require('./app');
  }
}

export default balance();
