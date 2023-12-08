// api.js

const BASE_URL = "http://localhost:5001";

const headers = new Headers();
headers.append("Content-Type", "application/json");

const abortController = new AbortController();
const signal = abortController.signal;

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */

async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}


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

export const createAnime = async (animePost) => {
  const url = new URL(`${BASE_URL}/anime`)
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data: animePost}),
    signal
  };

  return await fetchJson(url, options, [])
}
  