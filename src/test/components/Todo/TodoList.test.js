import React from "react";
import { expect, shallow, sinon } from "test";

import todos from "./fixtures/todos.json";
import TodoList from "components/Todo/TodoList";
import TodoListItem from "components/Todo/TodoListItem";

describe("<TodoList />", () => {
  let wrapper;

  let onClickSpy;
  let props;

  beforeEach(() => {
    onClickSpy = sinon.spy();

    props = {
      todos,
      onTodoClick: onClickSpy
    };

    wrapper = shallow(<TodoList {...props} />);
  });

  describe("when there are no todos in props", () => {
    beforeEach(() => {
      wrapper.setProps({ todos: [] });
    });

    it("renders no todos found message", () => {
      expect(wrapper).to.have.text("No todos found");
    });
  });

  describe("when there are todos in props", () => {
    beforeEach(() => {
      wrapper.setProps({ todos });
    });

    it("renders a TodoListItem for each todo", () => {
      expect(wrapper)
        .to.have.exactly(todos.length)
        .descendants(TodoListItem);
    });
  });
});
