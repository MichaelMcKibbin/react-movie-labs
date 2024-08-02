// import React, { useState, useEffect } from "react";
// import PageTemplate from "../components/templateMovieListPage";

// const HomePage = (props) => {
//   const [movies, setMovies] = useState([]);
//   const favorites = movies.filter((m) => m.favorite);
//   localStorage.setItem("favorites", JSON.stringify(favorites));

//   const addToFavorites = (movieId) => {
//     const updatedMovies = movies.map((m) =>
//       m.id === movieId ? { ...m, favorite: true } : m
//     );
//     setMovies(updatedMovies);
//   };

//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&page=1`
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         return json.results;
//       })
//       .then((movies) => {
//         setMovies(movies);
//       });
//   }, []);

//   return (
//     <PageTemplate
//       title="Discover Movies"
//       movies={movies}
//       selectFavorite={addToFavorites}
//     />
//   );
// };
// export default HomePage;
import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const HomePage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discover", getMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};
export default HomePage;
