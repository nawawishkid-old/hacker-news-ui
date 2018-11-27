import React from "react";
import {
  render as kentcdoddsRender,
  cleanup,
  waitForElement
} from "react-testing-library";
import { BrowserRouter } from "react-router-dom";
import NewsFeedContainer from "./Container";

describe("<NewsFeedContainer />", () => {
  const props = { sortType: "top", itemsPerLoad: 10 };
  const render = (customProps = {}) =>
    kentcdoddsRender(
      <BrowserRouter>
        <NewsFeedContainer {...{ ...props, ...customProps }} />
      </BrowserRouter>
    );

  afterEach(cleanup);

  it("should render <NewsFeedSorter />", () => {
    const { container } = render();

    expect(container.querySelector(".newsfeed-sorter")).toBeDefined();
  });

  it("shoud render <NewsFeedBoard />", () => {
    const { container } = render();

    expect(container.querySelector(".newsfeed-board")).toBeDefined();
  });

  it("shoud render <NewsFeedLoadButton />", () => {
    const { container } = render();

    expect(container.querySelector(".newsfeed-loadbutton")).toBeDefined();
  });

  it("should have " + props.itemsPerLoad + " <NewsFeedItem />", async () => {
    const { getAllByText, container } = render();
    console.log("container: ", container);
    const items = await waitForElement(() =>
      getAllByText(
        (content, element) => element.classList.contains("newsfeed-item"),
        { selector: "[class^=newsfeed-]" }
      )
    );
    console.log("items: ", items);

    expect(items.length).toBe(props.itemsPerLoad);
  });
});
