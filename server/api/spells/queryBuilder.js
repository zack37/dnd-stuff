import R from 'ramda';

const toRegexSearch = item => new RegExp(item, 'i');

const toRegexSearches = R.compose(R.map(toRegexSearch), R.split(/,\s*/));

const executionMap = {
  name: name => ({ name: toRegexSearch(name) }),
  classes: classes => ({
    classes: { $in: toRegexSearches(classes) }
  }),
  tags: tags => ({ tags: { $in: toRegexSearches(tags) } }),
  description: description => ({ $text: { $search: description } }),
  schools: schools => ({ school: { $in: toRegexSearches(schools) } })
};

export default R.compose(
  R.reduce((acc, [k, v]) => R.merge(acc, executionMap[k](v)), {}),
  R.filter(([key]) => R.has(key, executionMap)),
  R.toPairs()
);
