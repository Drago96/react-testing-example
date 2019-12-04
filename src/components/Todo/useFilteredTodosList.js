import { useState, useRef, useCallback, useMemo } from "react";

const useFilteredTodosList = () => {
  const { todos, addTodo, toggleTodoState } = useTodosList();
  const [currentFilter, changeCurrentFilter] = useState("All");

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case "All":
        return todos;
      case "Current":
        return todos.filter(todo => todo.active);
      case "Past":
        return todos.filter(todo => !todo.active);
      default:
        return [];
    }
  }, [todos, currentFilter]);

  return {
    addTodo,
    toggleTodoState,
    filteredTodos,
    currentFilter,
    changeCurrentFilter
  };
};

const useTodosList = () => {
  const todoId = useRef(1);
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback(
    todo => {
      setTodos([...todos, { ...todo, id: todoId.current++, active: true }]);
    },
    [todos, setTodos]
  );

  const toggleTodoState = useCallback(
    todoToToggle => {
      setTodos(
        todos.map(todo => {
          if (todo === todoToToggle) {
            return {
              ...todo,
              active: !todo.active
            };
          }

          return todo;
        })
      );
    },
    [todos, setTodos]
  );

  return {
    todos,
    addTodo,
    toggleTodoState
  };
};

export default useFilteredTodosList;
