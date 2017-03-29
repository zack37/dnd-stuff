export default db => {
  const spells = db.collection('spells');

  return spells
    .createIndexes([
      {
        key: { name: 1 },
        name: 'spells.name_index',
        unique: true,
        background: true
      },
      {
        key: { description: 'text' },
        name: 'spells.text_search_index',
        background: true
      }
    ])
    .then(() => module.exports.spells = spells);
};
