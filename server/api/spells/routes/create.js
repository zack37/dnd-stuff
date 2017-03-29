import joi from 'joi';
import R from 'ramda';

import { cache } from '../cache';
import { create } from '../manager';
import mutableFieldsStrict from '../schemas/mutableFieldsStrict';
import { dbToRaw, rawToDb } from '../transforms';
import responseSchema from '../schemas/response';

export default {
  method: 'POST',
  path: '/',
  config: {
    description: 'Create a new spell',
    tags: ['api', 'spells'],
    validate: {
      payload: mutableFieldsStrict
    },
    response: {
      status: {
        201: joi.object({
          spell: responseSchema
        })
      }
    }
  },
  handler: (req, reply) => {
    const createAndCache = create(rawToDb(req.payload))
      .then(dbToRaw)
      .then(x => cache.set(x.id, x));
    reply(createAndCache.then(R.objOf('spell'))).code(201);
  }
};
