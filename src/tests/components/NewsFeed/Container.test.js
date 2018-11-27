import React from "react";
import {
  render as kentcdoddsRender,
  cleanup,
  waitForElement,
  fireEvent
} from "react-testing-library";
import { BrowserRouter } from "react-router-dom";
import NewsFeedContainer from "../../../components/NewsFeed/Container";

describe("<NewsFeedContainer />", () => {
  const props = { sortType: "top", itemsPerLoad: 10 };
  const render = (customProps = {}) =>
    kentcdoddsRender(
      <BrowserRouter>
        <NewsFeedContainer {...{ ...props, ...customProps }} />
      </BrowserRouter>
    );
  const waitForNewsFeedItems = getAllByText =>
    waitForElement(() =>
      getAllByText(
        (content, element) => element.classList.contains("newsfeed-item"),
        { selector: "[class^=newsfeed-]" }
      )
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
    const { getAllByText } = render();
    const items = await waitForNewsFeedItems(getAllByText);

    expect(items.length).toBe(props.itemsPerLoad);
  });

  it(
    "should render " +
      props.itemsPerLoad * 2 +
      " <NewsFeedItem /> after clicking <NewsFeedLoadButton />",
    async () => {
      const { getAllByText, getByText } = render();

      await waitForNewsFeedItems(getAllByText);

      const loadButton = getByText("Load More");

      fireEvent.click(loadButton);

      const items = await waitForNewsFeedItems(getAllByText);

      expect(items.length).toBe(props.itemsPerLoad * 2);
    }
  );
});
