import { spells } from './db';

function baseQuery(search = {}) {
  const { page = 0, limit = 0, ...criteria } = search;
  let cursor = spells.find(criteria);
  if(limit > 0) {
    cursor = cursor.skip(page * limit).limit(limit);
  }
  return cursor;
}

export const count = (search = {}) => {
  return baseQuery(search).count();
};

export const query = (search = {}) => {
  return baseQuery(search).toArray();
};

export const byId = id => {
  return spells.findOne({ _id: id });
};

export const create = spell => {
  return spells.insertOne(spell).then(() => spell);
};
