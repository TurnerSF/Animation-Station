// AnimeDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAnimeDetail } from "../utils/api";


const AnimeReview = () => {
    const { anime_id } = useParams();
    const [animeDetail, setAnimeDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchDetail = async () => {
        try {
          const data = await fetchAnimeDetail(anime_id);
          setAnimeDetail(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDetail();
    }, [anime_id]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <div>
        <h2>Anime Detail Page</h2>
        <p>Showing details for Anime ID: {anime_id}</p>
        {animeDetail && (
          <>
            <p>Title: {animeDetail.title}</p>
            <p>Genres: {animeDetail.genres.join(", ")}</p>
            <p>Manga Author: {animeDetail.manga_author}</p>
            {/* Add other details as needed */}
          </>
        )}
      </div>
    );
  };

export default AnimeReview;
