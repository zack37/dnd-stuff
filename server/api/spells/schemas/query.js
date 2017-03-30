import joi from 'joi';

export default joi.object().meta({ className: 'QueryModel' }).keys({
  page: joi
    .number()
    .min(0)
    .integer()
    .default(0)
    .description('0 based page number for returning a subset of results'),
  limit: joi
    .number()
    .min(0)
    .integer()
    .default(0)
    .description(
      'Number of results to return per page. Leave as 0 for all results'
    ),
  name: joi
    .string()
    .description('Search for any string in the title (case insensitive)'),
  description: joi
    .string()
    .description('Search for an string in the description (case insensitive)'),
  tags: joi
    .string()
    .description(
      'Search for tags separated by comma (case insensitive). Executed as OR'
    ),
  classes: joi
    .string()
    .description(
      'Search for classes separated by comma (case insensitive). Executed as OR'
    ), 
  schools: joi
    .string()
    .description(
      'Search for schools separated by comma (case insensitive). Executed as OR'
    )
});
