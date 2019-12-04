import React from "react";

import { expect, shallow, sinon } from "test";

import TodoForm from "components/Todo/TodoForm";

describe("<TodoForm />", () => {
  let wrapper;

  let onSubmitSpy;
  let props;

  const elements = {
    form: () => wrapper.find("form"),
    inputs: {
      content: () => wrapper.find("input[name='content']"),
      submit: () => wrapper.find("input[type='submit']")
    }
  };

  beforeEach(() => {
    onSubmitSpy = sinon.spy();

    props = {
      onSubmit: onSubmitSpy
    };

    wrapper = shallow(<TodoForm {...props} />);
  });

  it("renders form", () => {
    expect(elements.form()).to.be.present();
  });

  it("renders content input", () => {
    expect(elements.inputs.content()).to.be.present();
  });

  it("renders submit button", () => {
    expect(elements.inputs.submit()).to.be.present();
  });

  it("has no value for content input", () => {
    expect(elements.inputs.content()).to.have.value("");
  });

  describe("when content input value change event is fired", () => {
    beforeEach(() => {
      elements.inputs.content().simulate("change", {
        target: { value: "some content" }
      });
    });

    it("updates content input value correctly", () => {
      expect(elements.inputs.content()).to.have.value("some content");
    });
  });

  describe("when form is submitted", () => {
    let preventDefaultSpy;

    beforeEach(() => {
      preventDefaultSpy = sinon.spy();

      elements.form().simulate("submit", { preventDefault: preventDefaultSpy });
    });

    it("prevents form's default event", () => {
      expect(preventDefaultSpy).to.have.been.called;
    });
  });

  describe("when form is submitted with empty content", () => {
    beforeEach(() => {
      elements.inputs.content().simulate("change", {
        target: { value: "" }
      });

      elements.form().simulate("submit", { preventDefault: () => {} });
    });

    it("does not call on submit handler from props", () => {
      expect(onSubmitSpy).not.to.have.been.called;
    });
  });

  describe("when form is submitted with non empty content", () => {
    beforeEach(() => {
      elements.inputs.content().simulate("change", {
        target: { value: "some content" }
      });

      elements.form().simulate("submit", { preventDefault: () => {} });
    });

    it("clears content input value", () => {
      expect(elements.inputs.content()).to.have.value("");
    });

    it("calls on submit handler from props", () => {
      expect(onSubmitSpy).to.have.been.calledWith({ content: "some content" });
    });
  });
});
