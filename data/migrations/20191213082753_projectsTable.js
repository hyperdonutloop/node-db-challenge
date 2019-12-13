
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.string('description');
    tbl
      .boolean('completed')
      .notNullable()
      .toString()
      .defaultTo(false);
    tbl
      .integer('task_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tasks')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl
      .integer('resource_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
  .createTable('resources', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.string('description');
  })
  .createTable('tasks', tbl => {
    tbl.increments();
    tbl.string('description').notNullable();
    tbl.string('notes');
    tbl
      .boolean('completed')
      .notNullable()
      .toString();
    tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
