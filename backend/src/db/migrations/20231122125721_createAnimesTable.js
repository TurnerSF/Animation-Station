exports.up = function (knex) {
    return knex.schema.createTable("anime", (table) => {
      table.increments("anime_id").primary(); // Sets anime_id as the primary key
      table.string("title").notNullable(); // Does not allow user to have title as null
      table.specificType("genres", "text[]").notNullable();
      table.string("manga_author").defaultTo("N/A"); // Default to {} if user doesn't provide. its {} becuase this indicates empty array in postgres
      table.string("animation_studio").defaultTo("N/A")
      table.integer("amount_of_episodes").defaultTo(null);
      table.text("path").notNullable();
      table.specificType("streaming_services", "text[]").defaultTo("{}");
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("anime");
  };
  