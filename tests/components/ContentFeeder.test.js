import React from "react";
import {
  render,
  waitForElement,
  cleanup,
  fireEvent
} from "react-testing-library";
import ContentFeeder from "../../src/components/ContentFeeder";

describe("<ContentFeeder />", () => {
  const content = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const getJoinedContent = (start = 0, until = null) =>
    content.slice(start, until).join(",");
  const split = (data, delimeter = ",") => data.split(delimeter);
  const click = (dom, num = 1) => {
    if (num === 1) {
      fireEvent.click(dom);

      return;
    }

    for (let i = 0; i < num; i++) {
      fireEvent.click(dom);
    }
  };

  // afterEach(cleanup);

  test("should render first set (page) of given data", async () => {
    const page = 2;
    const perPage = 3;
    const loadedPage = 2;
    const contentFrom = perPage * (page - 1);
    const contentLength = perPage * loadedPage + contentFrom;
    const joined = getJoinedContent(contentFrom, perPage + contentFrom);
    const { getByText, getByTestId } = render(
      <ContentFeeder
        loader={setContent => setContent(content)}
        perPage={perPage}
        page={page}
        render={contents => (
          <p data-testid="content-naja">{contents.join(",")}</p>
        )}
        button={props => (
          <button data-testid="load-naja" {...props}>
            Load
          </button>
        )}
      />
    );

    await waitForElement(() => getByText(c => c === joined));
    click(getByTestId("load-naja"), loadedPage - 1);

    const dom = await waitForElement(() => getByTestId("content-naja"));

    expect(split(dom.innerHTML).length).toBe(
      content.slice(contentFrom, contentLength).length
    );
  });
});
