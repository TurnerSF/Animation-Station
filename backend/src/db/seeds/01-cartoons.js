const cartoons = require("./01-cartoons.json")

exports.seed = function (knex) {
  return knex
  .raw("TRUNCATE TABLE cartoons RESTART IDENTITY CASCADE")
  .then(function () {
    return knex("cartoons").insert(cartoons);
  });
};
