exports.up = knex => {
    return knex.schema.createTable("stores", table => {
      table.increments("store_id").primary();
      table.string("storeName").notNullable();
      table.string("description")
      table.string("location").notNullable();
      table.json("users")
      table
        .integer("max_points")
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };

  exports.down = knex => {
    return knex.schema.dropTable("stores");
  };