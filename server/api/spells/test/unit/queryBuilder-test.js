import { expect } from 'chai';
import test from 'ava';

import queryBuilder from '../../queryBuilder';

test('should export a function', () => {
  expect(queryBuilder).to.be.a('function');
});

test('should return a single object', () => {
  expect(queryBuilder({})).to.be.an('object');
});

test('should turn name property into mongo regex search', () => {
  const queryCriteria = { name: 'test' };
  const queryObj = queryBuilder(queryCriteria);
  expect(queryObj).to.have.property('name').and.to.eql(/test/i);
});

test('should handle multiple properties', () => {
  const queryCriteria = { name: 'test', tags: 'test' };
  const queryObj = queryBuilder(queryCriteria);
  expect(queryObj).to.have.property('name').and.to.eql(/test/i);
  expect(queryObj).to.have.property('tags').and.to.eql({ $in: [/test/i] });
});

test('should split tags by ","', () => {
  const queryCriteria = { tags: 'test1, test2' };
  const queryObj = queryBuilder(queryCriteria);
  expect(queryObj.tags).to.have.property('$in').and.to.have.length(2);
  expect(queryObj.tags).to.eql({ $in: [/test1/i, /test2/i] });
});

test('should ignore properties it does not know about', () => {
  const queryCriteria = { 'this obviously does not work': 'fake' };
  const queryObj = queryBuilder(queryCriteria);
  expect(Object.keys(queryObj)).to.be.empty;
});
