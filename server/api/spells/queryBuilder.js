import R from 'ramda';

const toRegexSearch = R.compose(
  R.map(item => new RegExp(item, 'i')),
  R.split(/,\s*/)
);

const executionMap = {
  name: name => ({ name: new RegExp(name, 'i') }),
  classes: classes => ({
    classes: { $in: toRegexSearch(classes) }
  }),
  tags: tags => ({ tags: { $in: toRegexSearch(tags) } }),
  description: description => ({ $text: { $search: description } })
};

export default R.compose(
  R.mergeAll(),
  R.map(key => executionMap[key](criteria[key])),
  R.filter(key => R.has(key, criteria)),
  R.keys()
);
