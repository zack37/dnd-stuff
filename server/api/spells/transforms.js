import shortid from 'shortid';

export function rawToDb(raw) {
  return {
    _id: shortid.generate(),
    ...raw
  };
}

export function dbToRaw(db) {
  const { _id, ...rest } = db;
  return {
    id: _id,
    ...rest
  };
}
