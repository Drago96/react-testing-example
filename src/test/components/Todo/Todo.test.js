import React from "react";
import { expect, shallow, sinon } from "test";

import todos from "./fixtures/todos.json";
import Todo from "components/Todo/Todo";
import TodoForm from "components/Todo/TodoForm";
import TodoList from "components/Todo/TodoList";
import TodoFilters from "components/Todo/TodoFilters";
import * as useFilteredTodosList from "components/Todo/useFilteredTodosList";

describe("<TodoList />", () => {
  let wrapper;
  let sandbox;

  let addTodoSpy;
  let toggleTodoStateSpy;
  const filteredTodos = todos;
  const currentFilter = "Some Filter";
  let changeCurrentFilterSpy;

  const elements = {
    todoForm: () => wrapper.find(TodoForm),
    todoList: () => wrapper.find(TodoList),
    todoFilters: () => wrapper.find(TodoFilters)
  };

  beforeEach(() => {
    addTodoSpy = sinon.spy();
    toggleTodoStateSpy = sinon.spy();
    changeCurrentFilterSpy = sinon.spy();

    sandbox = sinon.sandbox.create();

    sandbox.stub(useFilteredTodosList, "default").returns({
      addTodo: addTodoSpy,
      toggleTodoState: toggleTodoStateSpy,
      changeCurrentFilter: changeCurrentFilterSpy,
      filteredTodos,
      currentFilter
    });

    wrapper = shallow(<Todo />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("renders TodoForm", () => {
    expect(elements.todoForm()).to.be.present();
  });

  it("passes correct onSubmit prop to TodoForm", () => {
    expect(elements.todoForm()).to.have.prop("onSubmit", addTodoSpy);
  });

  it("renders TodoList", () => {
    expect(elements.todoList()).to.be.present();
  });

  it("passes correct todos prop to TodoList", () => {
    expect(elements.todoList()).to.have.prop("todos", filteredTodos);
  });

  it("passes correct onTodoClick prop to TodoList", () => {
    expect(elements.todoList()).to.have.prop("onTodoClick", toggleTodoStateSpy);
  });

  it("renders TodoFilters", () => {
    expect(elements.todoFilters()).to.be.present();
  });

  it("passes correct currentFilter prop to TodoList", () => {
    expect(elements.todoFilters()).to.have.prop("currentFilter", currentFilter);
  });

  it("passes correct changeCurrentFilter prop to TodoList", () => {
    expect(elements.todoFilters()).to.have.prop(
      "onFilterChange",
      changeCurrentFilterSpy
    );
  });
});
