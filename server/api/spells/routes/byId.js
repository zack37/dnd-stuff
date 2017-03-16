import { byId } from '../manager';
import idSchema from '../schemas/id';

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
    }
  },
  handler: (req, reply) => {
    reply(byId(req.params.id));
  }
};
