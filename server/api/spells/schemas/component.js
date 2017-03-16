import Joi from 'joi';

export default Joi.object({
  verbal: Joi.boolean().default(false),
  somatic: Joi.boolean().default(false),
  material: Joi.alternatives().try(Joi.boolean().only(false), Joi.string()).default(false)
});
