const knex = require("../db/connection");

function listAllAnime() {
  return knex("anime").select("*").orderBy("anime_id");
}

const readAnime = (anime_id) => {
  return knex("anime").select("*").where({ anime_id: anime_id }).first();
};

async function createAnime({
  title,
  genres,
  manga_author,
  animation_studio,
  amount_of_episodes,
  imagePath,
}) {
  try {
    // Image handling
    const data = fs.readFileSync(imagePath);

    // Save image to the database
    const imageResult = await knex("images").insert({
      filename: "image.jpg",
      path: path.join("/images", "image.jpg"), // Store the path relative to your server
      // Add other image-related data as needed
    });

    // Assume image_id is the ID of the newly inserted image
    const image_id = imageResult[0];

    // Save anime data to the database
    await knex("anime").insert({
      title,
      genres,
      manga_author,
      animation_studio,
      amount_of_episodes,
      image_id, // Reference to the image
      // Add other anime-related data as needed
    });

    console.log("Anime and Image saved to the database.");

    return { message: "Anime created successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
}

module.exports = {
  listAllAnime,
  readAnime,
  createAnime,
};
