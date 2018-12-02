import React from "react";
import {
  render,
  waitForElement,
  cleanup,
  fireEvent
} from "react-testing-library";
import DataLoader from "../../../src/components/helpers/DataLoader";

describe("<DataLoader />", () => {
  afterEach(cleanup);

  test("should store given data into internal state", async () => {
    const content = "hahaha";
    const { getByText } = render(
      <DataLoader
        loader={setContent => setContent(content)}
        render={contents => (
          <>
            <label>Data</label>
            <p>{contents}</p>
          </>
        )}
      />
    );

    const item = await waitForElement(() =>
      getByText((c, element) => c === content)
    );

    expect(item.innerHTML).toEqual(content);
  });
});
