export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getMovie = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
  ).then((res) => res.json());
};

// WRONG!!  "https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.REACT_APP_TMDB_KEY + "&language=en-US"
// FIXED    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
export const getGenres = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  )
    .then((res) => res.json())
    .then((json) => json.genres);
};

export const getMovieImages = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => json.posters);
};
