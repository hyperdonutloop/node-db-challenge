
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.string('description');
    tbl
      .boolean('completed')
      .notNullable()
      .defaultTo(false);
  })
  .createTable('resources', tbl => {
    tbl.increments();
    tbl.string('name').notNullable().unique();
    tbl.string('description');
  })
  .createTable('tasks', tbl => {
    tbl.increments();
    tbl.string('description').notNullable();
    tbl.string('notes');
    tbl
      .boolean('completed')
      .notNullable()
      .defaultTo(false);
    tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
  .createTable('project_resources', tbl => {
    tbl.primary(['project_id', 'resource_id']);
    tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
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
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
