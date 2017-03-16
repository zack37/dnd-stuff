import { spells } from './db';

function baseQuery(search = {}) {
  const { page = 0, limit = 100, ...criteria } = search;
  return spells.find(criteria).skip(page * limit).limit(limit);
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
