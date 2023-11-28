const animes = require("./00-animes.json")

exports.seed = function (knex) {
  return knex
  .raw("TRUNCATE TABLE anime RESTART IDENTITY CASCADE")
  .then(function () {
    return knex("anime").insert(animes);
  });
};
