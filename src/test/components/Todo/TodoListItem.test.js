import React from "react";

import { expect, shallow, sinon } from "test";

import todos from "./fixtures/todos.json";
import TodoListItem from "components/Todo/TodoListItem";
import styles from "components/Todo/styles";

describe("<TodoListItem />", () => {
  let wrapper;

  let todo;
  let onClickSpy;
  let props;

  const elements = {
    listItem: () => wrapper.find("li")
  };

  beforeEach(() => {
    onClickSpy = sinon.spy();
    todo = todos[0];

    props = {
      todo,
      onTodoClick: onClickSpy
    };

    wrapper = shallow(<TodoListItem {...props} />);
  });

  it("renders todo list item", () => {
    expect(elements.listItem()).to.be.present();
  });

  it("renders todo content", () => {
    expect(elements.listItem()).to.have.text(todo.content);
  });

  describe("when todo is clicked", () => {
    beforeEach(() => {
      elements.listItem().simulate("click");
    });

    it("calls onTodoClick from props with todo as argument", () => {
      expect(onClickSpy).to.have.been.calledWith(todo);
    });
  });

  describe("when todo is active", () => {
    beforeEach(() => {
      wrapper.setProps({ todo: { ...todo, active: true } });
    });

    it("does not set inactiveTodo className for todo list item", () => {
      expect(elements.listItem()).not.to.have.className(styles.inactiveTodo);
    });
  });

  describe("when todo is not active", () => {
    beforeEach(() => {
      wrapper.setProps({ todo: { ...todo, active: false } });
    });

    it("sets inactiveTodo className for todo list item", () => {
      expect(elements.listItem()).to.have.className(styles.inactiveTodo);
    });
  });
});
