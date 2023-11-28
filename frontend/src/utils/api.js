// api.js

const BASE_URL = "http://localhost:5001";

export const fetchAnimeList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/anime`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching anime list:", error);
    throw error;
  }
};

export const fetchAnimeDetail = async (animeId) => {
    try {
      const response = await fetch(`${BASE_URL}/anime/${animeId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch anime detail. Status: ${response.status}. ${errorText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching anime detail:", error.message);
      throw error; // Re-throw the error for the component to handle
    }
  };
  