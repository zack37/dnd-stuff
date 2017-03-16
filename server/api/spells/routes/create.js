import { create } from '../manager';
import mutableFieldsStrict from '../schemas/mutableFieldsStrict';
import * as transforms from '../transforms';

export default {
  method: 'POST',
  path: '/',
  config: {
    description: 'Create a new spell',
    tags: ['api', 'spells'],
    validate: {
      payload: mutableFieldsStrict
    }
  },
  handler: (req, reply) => {
    reply(create(transforms.rawToDb(req.payload)));
  }
};
