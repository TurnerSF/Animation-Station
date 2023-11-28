exports.up = function (knex) {
  return knex.schema.createTable("cartoons", (table) => {
    table.increments("cartoon_id").primary(); // Sets anime_id as the primary key
    table.string("title").notNullable(); // Does not allow user to have title as null
    table.specificType("genres", "text[]").notNullable();
    table.string("created_by").defaultTo("N/A"); // Default to {} if user doesn't provide. its {} becuase this indicates empty array in postgres
    table.string("animation_studio").defaultTo("N/A");
    table.integer("episodes_amount").defaultTo(null);
    table.string("path").notNullable();
    table.specificType("streaming_services", "text[]").defaultTo("{}");
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cartoons");
};
