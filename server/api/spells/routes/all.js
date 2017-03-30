import Joi from 'joi';
import R from 'ramda';

import { count, query } from '../manager';
import { dbToRaw } from '../transforms';
import querySchema from '../schemas/query';
import responseSchema from '../schemas/response';

export default {
  method: 'GET',
  path: '/',
  config: {
    description: 'Get all spells',
    tags: ['api', 'spells'],
    validate: {
      query: querySchema
    },
    response: {
      status: {
        200: {
          spells: Joi.array().items(responseSchema),
          meta: Joi.object().unknown(true)
        }
      }
    }
  },
  handler: (req, reply) => {
    reply.withPaging(
      query(req.query).then(R.map(dbToRaw)).then(R.objOf('spells')),
      count(req.query)
    );
  }
};
