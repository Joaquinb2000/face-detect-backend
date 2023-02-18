// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 *
 */

const baseOptions = {
    client: 'pg',
    connection: process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
}
module.exports = {

  development: baseOptions,

  staging: baseOptions,

  production: baseOptions

};
