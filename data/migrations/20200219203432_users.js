
exports.up = function(knex) {
  return knex.schema.createTable('users', user=>{
      user.increments();
      user.string('username',124).notNullable().unique();
      user.string('email', 124).notNullable().unique();
      user.string('password', 248).notNullable();
      user.string('first_name', 124).notNullable();
      user.string('last_name', 124).notNullable();
      user.date('dob').notNullable();
      user.string('address', 248);
      user.string('city', 124);
      user.string('state', 124);
      user.integer('zip', 62);
      user.number('oauth_id', 124);
  })
  .createTable('favorites', favorite=>{
      favorite.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      favorite.integer('city_id').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('favorites').dropTableIfExists('users');
};
