
exports.up = function(knex) {
  /* Table Information
      - unique ID
      - name (required)
      - description
      - boolean (indicates project has been completed)
  */
  return knex.schema.createTable('projects', tbl => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.string('description');
    tbl
      .boolean('completed')
      .notNullable()
      .defaultTo(false);
  })
  /* Table Information
      - unique ID
      - name (required)
      - description
  */
  .createTable('resources', tbl => {
    tbl.increments();
    tbl.string('name').notNullable().unique();
    tbl.string('description');
  })
  /* Table Information
      - unique ID
      - description (required)
      - notes
      - boolean (indicates project has been completed)
  */
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
  /* This table is the intermediary table
    - holds 2 primary keys which (project_id and resource_id)
    - these two primary keys are FK's 
    - the FK's reference the *project_id* and *resource_id* from the tables above
  */
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
// drop tables must be in reverse order!
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
