import Joi from 'joi';

import componentsSchema from './component';
import schoolSchema from './school';

export default Joi.object()
  .meta({ className: 'SpellsModel' })
  .description(
    'Spells schema model that describes all fields, but does not enforce any requirement constrainsts'
  )
  .keys({
    name: Joi.string(),
    level: Joi.number().min(0).max(9).integer(),
    school: schoolSchema,
    castingTime: Joi.string(),
    range: Joi.string(),
    components: componentsSchema,
    duration: Joi.string(),
    description: Joi.string(),
    classes: Joi.array()
      .unique()
      .items(
        Joi.string().valid(
          'Bard',
          'Druid',
          'Paladin',
          'Ranger',
          'Sorcerer',
          'Warlock',
          'Wizard'
        )
      ),
    tags: Joi.array().items(Joi.string()),
    ritual: Joi.boolean().default(false),
    source: Joi.string()
  });
