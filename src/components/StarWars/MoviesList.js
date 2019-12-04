import React from "react";
import PropTypes from "prop-types";

import MovieListItem, { IMovie } from "./MovieListItem";

const MoviesList = ({ movies }) =>
  movies.map(movie => <MovieListItem key={movie.episodeId} movie={movie} />);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(IMovie)
};

MoviesList.defaultProps = {
  movies: []
};

export default MoviesList;
