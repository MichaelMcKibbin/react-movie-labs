import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

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

  const playlist = movies.filter((m) => m.playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  const addToPlaylist = (movieId) => true;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            {movie.favorite ? (
              <RemoveFromFavoritesIcon movie={movie} />
            ) : (
              <AddToFavoritesIcon movie={movie} />
            )}
            {movie.playlist ? (
              <RemoveFromPlaylistIcon movie={movie} />
            ) : (
              <AddToPlaylistIcon movie={movie} />
            )}
          </>
        );
      }}
    />
  );
};
export default HomePage;
