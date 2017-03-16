import R from 'ramda';
import shortid from 'shortid';

export function rawToDb(raw) {
  return Object.assign({}, raw, { _id: shortid.generate() });
}

export function dbToRaw(db) {
  return Object.assign({}, R.omit(['_id'], db), { id: db['_id'] });
}
