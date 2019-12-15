
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {name: 'Resource number 1', description: 'This is resource 1.'},
        {name: 'Resource number 2', description: 'This is resource 2.'},
        {name: 'Resource number 3', description: 'This is resource 3.'}
      ]);
    });
};
