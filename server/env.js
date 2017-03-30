import dotenv from 'dotenv';
import os from 'os';
import R from 'ramda';

dotenv.config();
const cpuCount = os.cpus().length;

export default {
  self: {
    apiPort: process.env.API_PORT,
    startServer: process.env.START_SERVER === 'true'
  },
  cluster: {
    enabled: process.env.CLUSTER_ENABLED === 'true',
    maxWorkers: R.clamp(
      1,
      cpuCount,
      parseInt(process.env.CLUSTER_MAX_WORKERS, 10) || cpuCount
    ),
    retryCount: parseInt(process.env.CLUSTER_RETRY_COUNT, 10) || 10
  },
  mongo: {
    connectionString: process.env.MONGO_CONNECTION_STRING
  },
  redis: {
    connectionString: process.env.REDIS_CONNECTION_STRING,
    ttl: process.env.REDIS_TTL
  }
};
