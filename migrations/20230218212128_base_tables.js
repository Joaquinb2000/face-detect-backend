/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('login', (table) =>{
            table.increments('id');
            table.string('email').checkRegex("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$").unique().notNullable();
            table.string('hash').notNullable();
        })
        .createTable('users', (table) => {
            table.increments('id');
            table.string('login_email').notNullable();
            table.foreign('login_email').references("login.email").onDelete("CASCADE")
            table.string('name').notNullable();
            table.timestamp('joined').defaultTo(knex.fn.now())
            table.integer('entries').defaultTo(0)
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("users")
        .dropTable("login")
};

exports.config = { transaction: false };
