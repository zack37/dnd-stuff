import R from 'ramda';

import env from '../env';
import redis from './redis';

const cache = connection => ({

  get: key => {
    return redis
      .multi()
      .select(connection)
      .get(key.toString())
      .exec()
      .then(R.compose(JSON.parse, R.prop('1'), R.last()));
  },

  set: (key, value) => {
    return redis
      .multi()
      .select(connection)
      .setex(key.toString(), env.redis.ttl, JSON.stringify(value))
      .exec()
      .then(() => value);
  }
});

export default cache;

export const connections = {
  DEFAULT: 0,
  SPELLS: 1
};
