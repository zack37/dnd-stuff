import idSchema from './id';
import mutableFieldsStrict from './mutableFieldsStrict';

export default mutableFieldsStrict.keys({
  id: idSchema.required()
});
