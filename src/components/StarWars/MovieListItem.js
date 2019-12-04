import React from "react";
import PropTypes from "prop-types";

const MovieListItem = ({ movie }) => (
  <p>
    <b>{movie.title}</b> - produced by {movie.director} -{" "}
    {movie.releaseDate.substr(0, 4)}
  </p>
);

export const IMovie = PropTypes.shape({
  episodeId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired
});

MovieListItem.propTypes = {
  movie: IMovie
};

export default MovieListItem;
