const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
const LANGUAGE = "ko-KR";

const fetchFromApi = async (endpoint, options = {}) => {
  const url = new URL(BASE_URL + endpoint);
  //console.log(url)
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", LANGUAGE);

  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
};

export default fetchFromApi;