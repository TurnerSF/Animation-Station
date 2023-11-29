exports.up = function (knex) {
    return knex.schema.createTable("reviews", (table) => {
      table.increments("review_id").primary();
      table.text("content").notNullable();
      table.integer("rating").notNullable();
      table.integer("anime_id").unsigned().references("anime_id").inTable("anime").onDelete("CASCADE");
      table.integer("cartoon_id").unsigned().references("cartoon_id").inTable("cartoons").onDelete("CASCADE");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("reviews");
  };
  