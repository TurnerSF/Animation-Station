import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAnime } from "../utils/api";
import "./index.css"

function AnimeForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null)

  const handleCancel = () => {
    navigate(-1)
  }

  const [formData, setFormData] = useState({
    title: "",
    genres: [],
    manga_author: "",
    animation_studio: "",
    amount_of_episodes: 1,
  });

  const abortController = new AbortController()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    formData.amount_of_episodes = Number(formData.amount_of_episodes)
    
    try {
      await createAnime(formData, abortController.signal)
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container">
      {/* Form header */}
      <h3 className="create-anime-header mb-3 mt-3">Create Anime For Review: </h3>
      <fieldset>
        <div className="form-full">
          <input
            type="text"
            name="title"
            className="formcreation ms-5"
            id="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="genres[]"
            className="formcreation ms-3"
            id="genres"
            placeholder="Genres"
            value={formData.genres}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="manga_author"
            className="formcreation ms-3"
            id="manga_author"
            placeholder="Manga Author"
            value={formData.manga_author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="animation_studio"
            className="formcreation ms-3"
            id="animation_studio"
            placeholder="Animation Studio"
            value={formData.animation_studio}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="amount_of_episodes"
            className="formcreation ms-3"
            id="amount_of_episodes"
            placeholder="Amount of Episodes"
            value={formData.amount_of_episodes}
            onChange={handleChange}
            required
            pattern="\d+"
            title="Enter a valid number for amount of episodes"
          />
        </div>
      </fieldset>
      <div className="mt-4">
        <button className="btn btn-primary submit" type="submit">
          Submit
        </button>
        <button className="btn btn-primary cancel" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AnimeForm;
