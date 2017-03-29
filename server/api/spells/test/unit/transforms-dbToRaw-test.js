import test from 'ava';

import { dbToRaw } from '../../transforms';

test('should remove _id property', t => {
  const model = dbToRaw({ _id: 'test' });
  t.falsy(model._id);
});

test('should add id property same as _id of object being passed in', t => {
  const model = dbToRaw({ _id: 'test' });
  t.truthy(model.id);
  t.is(model.id, 'test');
});

test('should not alter object being passed in', t => {
  const orig = { _id: 'test' };
  const model = dbToRaw(orig);
  t.falsy(orig.id);
  t.truthy(orig._id);
  t.truthy(model.id);
});
