import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAnimeList } from "../utils/api";
import "./index.css"; // Import your CSS file

const Homepage = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchAnimeData();
  }, []);

  const fetchAnimeData = async () => {
    try {
      const data = await fetchAnimeList();
      setAnimeList(data);
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div className="container-fluid homepage-container">
      {/* Button to create a new anime */}
      <Link to="/create" className="create-anime-button">
        <button className="create-anime-button">Create New Anime</button>
      </Link>

      {animeList.map((anime) => (
        <Link
          to={`/anime/${anime.anime_id}`}
          key={anime.anime_id}
          className="link-style"
        >
          <div className="anime-item">
            <div className="anime-info">
              <strong>Title:</strong> {anime.title}
              <br />
              <strong>Genres:</strong> {anime.genres.join(", ")}
              <br />
              <strong>Manga Author:</strong> {anime.manga_author}
              <br />
              <strong>Animation Studio:</strong> {anime.animation_studio}
              <br />
              <strong>Amount Of Episodes:</strong> {anime.amount_of_episodes}
              <br />
              <strong>Streaming Services:</strong>{" "}
              {anime.streaming_services.join(", ")}
              <br />
            </div>
            {anime.path && (
              <div className="anime-image">
                <img src={anime.path} alt={anime.title} />
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Homepage;
