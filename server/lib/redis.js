import Redis from 'ioredis';

import env from '../env';

export default new Redis(env.redis.connectionString);
