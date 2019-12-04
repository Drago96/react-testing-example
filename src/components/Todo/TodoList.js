import React from "react";
import PropTypes from "prop-types";

import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onTodoClick }) => {
  if (todos.length > 0) {
    return (
      <ul>
        {todos.map(todo => (
          <TodoListItem key={todo.id} todo={todo} onTodoClick={onTodoClick} />
        ))}
      </ul>
    );
  }

  return <div>No todos found</div>;
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
