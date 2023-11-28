const reviews = require("./02-reviews.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE reviews RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("reviews").insert(reviews);
    });
};