exports.up = function (knex) {
  return knex.schema.table('users', function (t) {
    t.string('googleId', 255).unique()
    t.string('githubId', 255).unique()
    t.string('facebookId', 255).unique()
    t.string('twitterId', 255).unique()
    t.string('linkedinId', 255).unique()
  })
};

exports.down = function (knex) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('linkedinId')
    t.dropColumn('twitterId')
    t.dropColumn('facebookId')
    t.dropColumn('githubId')
    t.dropColumn('googleId')
  })

};