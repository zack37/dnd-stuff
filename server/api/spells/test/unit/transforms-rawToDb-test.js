import test from 'ava';

import { rawToDb } from '../../transforms';

test('should add _id property', t => {
  const model = rawToDb({});
  t.truthy(model._id, 'missing _id field');
});

test('should add _id as shortid', t => {
  const model = rawToDb({});
  t.regex(model._id, /[a-z0-9_-]{7,14}/i, '_id is not a shortid');
});

test('should not alter object being passed in', t => {
  const orig = {}; 
  const model = rawToDb(orig);
  t.truthy(model._id);
  t.falsy(orig._id);
});
