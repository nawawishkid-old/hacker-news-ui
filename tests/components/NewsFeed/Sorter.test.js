import React from "react";
import { render as kentcdoddsRender, cleanup } from "react-testing-library";
import NewsFeedSorter from "../../../components/NewsFeed/Sorter";

describe("<NewsFeedSorter />", () => {
  const props = { sortTypes: ["a", "b"], select: "a" };
  const render = (customProps = {}) =>
    kentcdoddsRender(<NewsFeedSorter {...{ ...props, ...customProps }} />);
  const ucfirst = string => string[0].toUpperCase() + string.substring(1);

  afterEach(cleanup);

  it("should render div.newsfeed-sorter as a wrapper element", () => {
    const { container } = render();

    expect(container.querySelector(".newsfeed-sorter")).toBeDefined();
  });

  it(
    "should render " +
      props.sortTypes.length +
      " buttons based on number of props.sortTypes",
    () => {
      const sorter = render().container.querySelector(".newsfeed-sorter");

      expect(sorter.children.length).toBe(props.sortTypes.length);
    }
  );

  it("should render button label's first letter to be uppercase", () => {
    const { getByText } = render();

    props.sortTypes.forEach(type => getByText(ucfirst(type)));
  });

  it("should style unselected button to have 50% opacity", () => {
    const { getByText } = render();

    props.sortTypes
      .filter(type => type !== props.select)
      .forEach(type =>
        expect(getByText(ucfirst(type)).style.opacity).toEqual("0.5")
      );
  });

  it("should not change the opacity of selected button", () =>
    expect(render().getByText(ucfirst(props.select)).style.opacity).toEqual(
      "1"
    ));
});
