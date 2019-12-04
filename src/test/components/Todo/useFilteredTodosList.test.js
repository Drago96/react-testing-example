import { renderHook, act } from "@testing-library/react-hooks";
import { expect } from "test";

import useFilteredTodosList from "components/Todo/useFilteredTodosList";

describe("useFilteredTodosList", () => {
  let result;

  beforeEach(() => {
    result = renderHook(() => useFilteredTodosList()).result;
  });

  describe("on initial render", () => {
    it("has a current filter with value All", () => {
      expect(result.current.currentFilter).to.eq("All");
    });

    it("has an empty array of filteredTodos", () => {
      expect(result.current.filteredTodos).to.eql([]);
    });
  });

  describe("when addTodo is called", () => {
    beforeEach(() => {
      act(() => {
        result.current.addTodo({ content: "Some content" });
      });
    });

    it("adds todo to array of filtered todos", () => {
      expect(result.current.filteredTodos).to.eql([
        {
          id: 1,
          content: "Some content",
          active: true
        }
      ]);
    });
  });

  describe("when changeCurrentFilter is called", () => {
    beforeEach(() => {
      act(() => {
        result.current.changeCurrentFilter("Past");
      });
    });

    it("changes current filter value", () => {
      expect(result.current.currentFilter).to.eq("Past");
    });
  });

  describe("when hook has an active todo", () => {
    beforeEach(() => {
      act(() => {
        result.current.addTodo({ content: "Some content" });
      });
    });

    describe("when toggleTodoState is called with active todo", () => {
      beforeEach(() => {
        act(() => {
          result.current.toggleTodoState(result.current.filteredTodos[0]);
        });
      });

      it("marks todo as inactive", () => {
        expect(result.current.filteredTodos[0].active).to.be.false;
      });
    });
  });

  describe("when hook has an active and an inactive todo", () => {
    let activeTodo;
    let inactiveTodo;

    beforeEach(() => {
      act(() => result.current.addTodo({ content: "Some content" }));
      act(() => result.current.addTodo({ content: "Some other content" }));
      act(() =>
        result.current.toggleTodoState(result.current.filteredTodos[1])
      );

      activeTodo = result.current.filteredTodos[0];
      inactiveTodo = result.current.filteredTodos[1];
    });

    describe("when current filter is All", () => {
      beforeEach(() => {
        act(() => {
          result.current.changeCurrentFilter("All");
        });
      });

      it("filters both todos", () => {
        expect(result.current.filteredTodos).to.eql([activeTodo, inactiveTodo]);
      });
    });

    describe("when current filter is Current", () => {
      beforeEach(() => {
        act(() => {
          result.current.changeCurrentFilter("Current");
        });
      });

      it("filters active todo only", () => {
        expect(result.current.filteredTodos).to.eql([activeTodo]);
      });
    });

    describe("when current filter is Past", () => {
      beforeEach(() => {
        act(() => {
          result.current.changeCurrentFilter("Past");
        });
      });

      it("filters inactive todo only", () => {
        expect(result.current.filteredTodos).to.eql([inactiveTodo]);
      });
    });

    describe("when current filter is not recognised", () => {
      beforeEach(() => {
        act(() => {
          result.current.changeCurrentFilter("Invalid Filter");
        });
      });

      it("filters an empty array", () => {
        expect(result.current.filteredTodos).to.be.empty;
      });
    });
  });
});
