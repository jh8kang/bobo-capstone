exports.up = knex => {
    return knex.schema.createTable("users", table => {
      table.increments("user_id").primary();
      table.string("name").notNullable();
      table.string("username").notNullable();
      table.string("location").notNullable();
      table.string("phone").notNullable();
      table.string("email").notNullable();
      table.json("stores")
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };

  exports.down = knex => {
    return knex.schema.dropTable("warehouses");
  };