import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./styles";

const TodoListItem = ({ todo, onTodoClick }) => (
  <li
    className={classnames({ [styles.inactiveTodo]: !todo.active })}
    onClick={() => onTodoClick(todo)}
  >
    {todo.content}
  </li>
);

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoListItem;
