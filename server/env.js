import dotenv from 'dotenv';

dotenv.config();

export default {
  self: {
    apiPort: process.env.API_PORT,
    isClustered: process.env.IS_CLUSTERED === 'true',
    startServer: process.env.START_SERVER === 'true'
  },
  mongo: {
    connectionString: process.env.MONGO_CONNECTION_STRING
  },
  redis: {
    connectionString: process.env.REDIS_CONNECTION_STRING,
    ttl: process.env.REDIS_TTL
  }
};
