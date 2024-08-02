import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Spinner from "../components/spinner";
import { getMovies, getUpcoming } from "../api/tmdb-api";
import { useQuery } from "react-query";

// use caching for data
const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcoming);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;

  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&page=1`
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       return json.results;
  //     })
  //     .then((movies) => {
  //       setMovies(movies);
  //     });
  // }, []);

  return (
    <PageTemplate
      title="Coming soon, to a theater near you..."
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;
