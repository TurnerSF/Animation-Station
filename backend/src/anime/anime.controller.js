const service = require("./anime.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    try {
        const animeList = await service.listAllAnime()
        if (!animeList) {
            return res.status(404).json({error: "Animes cannot be found"})
        }

        res.status(200).json(animeList)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal Service Error"})
    }
}


async function read(req, res) {
    const { anime_id } = req.params;
  
    try {
      const anime = await service.readAnime(anime_id);
      if (!anime) {
        return res.status(404).json({ error: "Anime not found" });
      }
  
      res.status(200).json(anime);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Service Error" });
    }
  }

  const fs = require('fs');
  const path = require('path');
  const knex = require('../db/connection'); // Adjust the path as needed
  
  async function createAnime(req, res) {
    try {
      // Extract other anime data from the request body
      const { title, genres, manga_author, animation_studio, amount_of_episodes } = req.body;
  
      // Image handling
      const imagePath = '/path/to/your/image.jpg'; // Replace with the actual path to your image
      const data = fs.readFileSync(imagePath);
      const base64Image = data.toString('base64');
  
      // Save image to the database
      const imageResult = await knex('images').insert({
        filename: 'image.jpg',
        path: path.join('/images', 'image.jpg'), // Store the path relative to your server
        // Add other image-related data as needed
      });
  
      // Assume image_id is the ID of the newly inserted image
      const image_id = imageResult[0];
  
      // Save anime data to the database
      const animeResult = await knex('anime').insert({
        title,
        genres,
        manga_author,
        animation_studio,
        amount_of_episodes,
        image_id, // Reference to the image
        // Add other anime-related data as needed
      });
  
      console.log('Anime and Image saved to the database.');
  
      res.status(201).json({ message: 'Anime created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }



module.exports = {
    list,
    read
}