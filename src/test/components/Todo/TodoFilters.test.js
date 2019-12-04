import React from "react";

import { expect, shallow, sinon } from "test";

import TodoFilters from "components/Todo/TodoFilters";
import styles from "components/Todo/styles";

describe("<TodoFilters />", () => {
  const EXPECTED_FILTERS = ["All", "Current", "Past"];

  let wrapper;

  let onFilterChangeSpy;
  let props;

  const elements = {
    filters: () => wrapper.find(`.${styles.filter}`),
    filterLink: filterName =>
      elements
        .filters()
        .findWhere(link => link.text() === filterName)
        .first()
  };

  beforeEach(() => {
    onFilterChangeSpy = sinon.spy();

    props = {
      currentFilter: "",
      onFilterChange: onFilterChangeSpy
    };

    wrapper = shallow(<TodoFilters {...props} />);
  });

  it(`renders exactly ${EXPECTED_FILTERS.length} filters`, () => {
    expect(elements.filters()).to.have.length(EXPECTED_FILTERS.length);
  });

  EXPECTED_FILTERS.forEach(filterName => {
    it(`renders ${filterName} filter`, () => {
      expect(elements.filterLink(filterName)).to.be.present();
    });

    describe(`when filter ${filterName} is active`, () => {
      beforeEach(() => {
        wrapper.setProps({ currentFilter: filterName });
      });

      it(`sets activeFilter className for filter ${filterName}`, () => {
        expect(elements.filterLink(filterName)).to.have.className(
          styles.activeFilter
        );
      });

      it("does not set activeFilter className for all other filters", () => {
        EXPECTED_FILTERS.filter(filter => filter !== filterName).forEach(
          inactiveFilter => {
            expect(elements.filterLink(inactiveFilter)).not.to.have.className(
              styles.activeFilter
            );
          }
        );
      });
    });

    describe(`when ${filterName} filter link is clicked`, () => {
      beforeEach(() => {
        elements.filterLink(filterName).simulate("click");
      });

      it("calls onFilterChange from props with correct filter", () => {
        expect(onFilterChangeSpy).to.have.been.calledWith(filterName);
      });
    });
  });
});
