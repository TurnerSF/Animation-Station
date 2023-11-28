const knex = require("../db/connection");

function listAllAnime() {
  return knex("anime").select("*").orderBy("anime_id");
}

const readAnime = (anime_id) => {
  return knex("anime").select("*").where({ anime_id: anime_id }).first();
};

module.exports = {
  listAllAnime,
  readAnime,
};
