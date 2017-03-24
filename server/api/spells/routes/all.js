import Joi from 'joi';
import R from 'ramda';

import { query } from '../manager';
import * as transforms from '../transforms';

export default {
  method: 'GET',
  path: '/',
  config: {
    description: 'Get all spells',
    tags: ['api', 'spells'],
    validate: {
      query: Joi.object({
        page: Joi.number().min(0).integer().default(0),
        limit: Joi.number().min(0).integer().default(0)
      }).unknown(true)
    }
  },
  handler: (req, reply) => {
    reply(
      query(req.query).then(R.map(transforms.dbToRaw)).then(R.objOf('spells'))
    );
  }
};
