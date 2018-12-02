import React from "react";
import {
  render,
  waitForElement,
  cleanup,
  fireEvent
} from "react-testing-library";
import Paginator from "../../../src/components/helpers/Paginator";

describe("Paginator", () => {
  const content = ["a", "b", "c", "d", "e", "f"];
  const DEFAULT_NUMBER_PER_PAGE = 5;
  const getJoinedContent = (start = 0, until = DEFAULT_NUMBER_PER_PAGE) =>
    content.slice(start, until).join(",");
  const split = (data, delimeter = ",") => data.split(delimeter);

  afterEach(cleanup);

  test("should returns first set of given data (page 1) by default", () => {
    const joined = getJoinedContent();
    const { getByText } = render(
      <Paginator
        contents={content}
        // perPage={3}
        render={contents => <p>{contents.join(",")}</p>}
      />
    );

    getByText(joined);
  });

  test("should returns default number of data per page if perPage props is not given", () => {
    const { getByText } = render(
      <Paginator
        contents={content}
        render={contents => <p>{contents.join(",")}</p>}
      />
    );
    const joined = getJoinedContent();
    const dom = getByText(joined);

    expect(split(dom.innerHTML).length).toBe(split(joined).length);
  });
});
