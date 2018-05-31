exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedules', function(table){
    table.increments('schedule_id');
    table.text('schedule');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedules');
};
