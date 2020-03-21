exports.up = function (knex) {
  return knex.schema.alterTable('users', function (t) {
    t.string('email', 128).alter();
    t.string('first_name', 128).alter();
    t.string('last_name', 128).alter();
    t.string('dob').alter()
  })
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', function (t) {
    t.string('dob').notNullable().alter();
    t.string('last_name', 124).notNullable().alter();
    t.string('first_name', 124).notNullable().alter()
    t.string('email', 124).notNullable().unique().alter();

  })
};