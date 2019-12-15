
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'Random Project', description: 'This is a cool project', completed: false},
        {name: 'Random Project Two', description: 'This is a cool project number 2', completed: false},
        {name: 'Random Project Three', description: 'This is a cool project number 3', completed: false}
      ]);
    });
};
