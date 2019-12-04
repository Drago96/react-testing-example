import React, { Fragment, Component } from "react";

import MoviesListContainer from "./MoviesListContainer";

class StarWars extends Component {
  state = {
    searchTerm: ""
  };

  handleSearchTermChange = ({ target: { value } }) =>
    this.setState({ searchTerm: value });

  render() {
    return (
      <Fragment>
        <div>
          <input
            type="text"
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
          />
        </div>
        <MoviesListContainer searchTerm={this.state.searchTerm} />
      </Fragment>
    );
  }
}

export default StarWars;
