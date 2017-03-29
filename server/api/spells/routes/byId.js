import boom from 'boom';
import joi from 'joi';
import R from 'ramda';

import { cache } from '../cache';
import { dbToRaw } from '../transforms';
import { byId } from '../manager';
import idSchema from '../schemas/id';
import responseSchema from '../schemas/response';

export default {
  method: 'GET',
  path: '/{id}',
  config: {
    description: 'Get a spell by its id',
    tags: ['api', 'spells'],
    validate: {
      params: {
        id: idSchema
      }
    },
    response: {
      status: {
        200: joi.object({
          spell: responseSchema
        })
      }
    }
  },
  handler: (req, reply) => {
    const spellId = req.params.id;
    const log = req.server.log.bind(req.server);
    const getOrAdd = cache.get(spellId).then(cacheSpell => {
      log(['info'], 'grabbing from cache');
      return cacheSpell ||
        byId(spellId).then(spell => {
          log(['trace'], 'pulled from database');
          if (spell) {
            log(['trace'], 'putting into cache');
            return cache.set(spellId, dbToRaw(spell));
          }
          log(['trace'], 'spell does not exists in database');
          throw boom.notFound(`Spell not found with id ${spellId}`);
        });
    });

    reply(getOrAdd.then(R.objOf('spell')));
  }
};
