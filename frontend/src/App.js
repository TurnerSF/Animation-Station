import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Homepage from "./home/Homepage";
import AnimeDetail from "./anime-reviews/AnimeReview"; // Import your AnimeDetail component
import AnimeForm from "./create-anime/AnimeForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:anime_id" element={<AnimeDetail />} />
      </Routes>
      <Routes>
        <Route path="/create" element={<AnimeForm />} />
      </Routes>
    </>
  );
}

export default App;
