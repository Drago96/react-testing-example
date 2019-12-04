import React, { Fragment } from "react";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";

import useFilteredTodosList from "./useFilteredTodosList";

const Todo = () => {
  const {
    addTodo,
    toggleTodoState,
    filteredTodos,
    currentFilter,
    changeCurrentFilter
  } = useFilteredTodosList();

  return (
    <Fragment>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={filteredTodos} onTodoClick={toggleTodoState} />
      <TodoFilters
        currentFilter={currentFilter}
        onFilterChange={changeCurrentFilter}
      />
    </Fragment>
  );
};

export default Todo;
