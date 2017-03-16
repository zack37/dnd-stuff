import Joi from 'joi';

export default Joi.string()
  .regex(/[a-z0-9-_]{7,14}/i);
