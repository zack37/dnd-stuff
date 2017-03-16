// if moved to own repository, should handle connecting to instance
export default db => {
  module.exports.spells = db.collection('spells');
};
