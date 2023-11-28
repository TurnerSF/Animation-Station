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



module.exports = {
    list,
    read
}