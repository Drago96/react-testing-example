import React from "react";
import PropTypes from "prop-types";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import MoviesList from "./MoviesList";

const SEARCH_MOVIES = gql`
  query searchMovies($searchTerm: String) {
    allFilms(
      filter: { title_contains: $searchTerm }
      orderBy: releaseDate_ASC
    ) {
      episodeId
      title
      releaseDate
      director
    }
  }
`;

const MoviesListContainer = ({ searchTerm }) => (
  <Query query={SEARCH_MOVIES} variables={{ searchTerm }}>
    {({ data, loading, error }) => {
      if (loading) {
        return "Loading...";
      }

      if (error) {
        return `Error: ${error}`;
      }

      return <MoviesList movies={data.allFilms} />;
    }}
  </Query>
);

MoviesListContainer.propTypes = {
  searchTerm: PropTypes.string.isRequired
};

export default MoviesListContainer;
