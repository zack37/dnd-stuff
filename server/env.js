import dotenv from 'dotenv';

dotenv.config();

export default {
  self: {
    apiPort: process.env.API_PORT,
    startServer: process.env.START_SERVER === 'true'
  },
  mongo: {
    connectionString: process.env.MONGO_CONNECTION_STRING
  }
};
