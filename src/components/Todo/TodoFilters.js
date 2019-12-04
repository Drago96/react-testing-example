import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./styles";

const TodoFilters = ({ currentFilter, onFilterChange }) => (
  <div>
    {["All", "Current", "Past"].map(filter => (
      <span
        key={filter}
        className={classnames(
          {
            [styles.activeFilter]: currentFilter === filter
          },
          styles.filter
        )}
        onClick={() => onFilterChange(filter)}
      >
        {filter}
      </span>
    ))}
  </div>
);

TodoFilters.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default TodoFilters;
