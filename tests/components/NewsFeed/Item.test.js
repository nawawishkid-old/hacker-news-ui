import React from "react";
import { render as kentcdoddsRender, cleanup } from "react-testing-library";
import { BrowserRouter } from "react-router-dom";
import NewsFeedItem from "../../../src/components/NewsFeed/Item";

describe("<NewsFeedItem />", () => {
  const hnItemMock = {
    id: 123456,
    url: "https://example.com/",
    title: "React testing library"
  };
  const props = { data: hnItemMock, order: 1 };
  const titleText = props.order + ". " + hnItemMock.title;
  const render = (optionalProps = {}) =>
    kentcdoddsRender(
      <BrowserRouter>
        <NewsFeedItem {...{ ...props, ...optionalProps }} />
      </BrowserRouter>
    );

  afterEach(cleanup);

  describe("<Title />", () => {
    test("render correct title.textContent DOM attribute from given props.data.title", () => {
      const { getByText } = render();

      getByText(titleText);
      /**
       * No expect() here because if getByText() could not find
       * any element, it will throw an error.
       */
    });

    test("render correct title.title DOM attribute from given props.data.title", () => {
      const { getByText } = render();
      const title = getByText(titleText);

      expect(title.title).toEqual(hnItemMock.title);
    });

    test("render title as a link (<a> tag)", () => {
      const { getByText } = render();
      const title = getByText(titleText);

      expect(title.tagName).toEqual("A");
    });

    test("render correct title.href DOM attribute from given props.data.url", () => {
      const { getByText } = render();
      const title = getByText(titleText);

      expect(title.href).toEqual(hnItemMock.url);
    });
  });

  describe("<Detail /> Link", () => {
    test("render correct link.textContent using given props.data.url", () => {
      const { getByText } = render();
      const detailLink = getByText("Link");

      expect(detailLink.textContent).toEqual("Link");
    });

    test("render correct link.href using given props.data.url", () => {
      const { getByText } = render();
      const detailLink = getByText("Link");

      expect(detailLink.href).toEqual(hnItemMock.url);
    });
  });

  describe("<Detail /> Discussion", () => {
    test("render 'Discussion' if Hacker News story has no comment", () => {
      const { getByText } = render();

      getByText("Discussion");
    });

    test("render 'Discussion (x)' if Hacker News story has x number of comments", () => {
      const descendants = 1;
      const { getByText } = render({ data: { ...props.data, descendants } });

      getByText("Discussion (" + descendants + ")");
    });

    test("render as a link (<a> tag)", () => {
      const discuss = render().container.querySelector(".discussion");

      expect(discuss.tagName).toEqual("A");
    });

    test("render correct href DOM attribute", () => {
      const discuss = render().getByText("Discussion");
      const pattern = new RegExp(".*/news/" + hnItemMock.id + "$", "g");

      expect(discuss.href).toMatch(pattern);
    });
  });
});
