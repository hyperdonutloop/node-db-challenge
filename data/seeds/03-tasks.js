
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          description: 'Get some breakfast', 
          notes: 'Pancakes are good. Waffles are better', 
          completed: true, 
          project_id: 1
        },
        {
          description: 'Get some lunch', 
          notes: 'Salmon with rice and steamed veggies', 
          completed: false, 
          project_id: 1
        },
        {
          description: 'Get some breakfast', 
          notes: 'Pancakes are good. Waffles are better', 
          completed: true, 
          project_id: 2
        },
        {
          description: 'Get some dinner', 
          notes: 'Pancakes are good. Waffles are better', 
          completed: true, 
          project_id: 2
        },
        {
          description: 'Get some snacks', 
          notes: 'Pancakes are good. Waffles are better', 
          completed: false, 
          project_id: 3
        },
        {
          description: 'Practice NodeJS', 
          notes: 'Pancakes are good. Waffles are better', 
          completed: false, 
          project_id: 3
        },
      ]);
    });
};
