const API_URL = process.env.REACT_APP_IMDB_API!;
const API_KEY = process.env.REACT_APP_IMDB_API_KEY!;

if (!API_URL || !API_KEY) {
  throw new Error('IMDB API URL or API Key is missing in environment variables.');
}

export const fetchSeriesData = async (imdbID:string) => {
  const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};