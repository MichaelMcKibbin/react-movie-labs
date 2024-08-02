import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getMovies, getUpcoming } from "../api/tmdb-api";
import { useQuery } from "react-query";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

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

  return (
    <PageTemplate
      title="Coming soon, to a theater near you..."
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;
