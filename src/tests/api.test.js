import * as api from "../api";

const validHNStoryId = 18509083;
const validHNStoryIds = [validHNStoryId, 18520462];
const customFilter = (id, index) => index > 0 && index < 10;
const testValidItemContent = item => expect(typeof item.id).toEqual("number");
const testValidItemId = item => expect(typeof item).toEqual("number");
const testItemsIsArray = items => expect(Array.isArray(items)).toBeTruthy();
const testItemsLengthEqual = (items, length) =>
  expect(items.length).toEqual(length);
const getTestValidItemContentArray = length => items => {
  testItemsIsArray(items);
  testItemsLengthEqual(items, length);
  items.forEach(item => testValidItemContent(item));
};
const getTestValidItemIdArray = length => items => {
  testItemsIsArray(items);
  testItemsLengthEqual(items, length);
  items.forEach(item => testValidItemId(item));
};
const getTestValidItemBothArray = length => ({ ids, content }) => {
  getTestValidItemIdArray(length)(ids);
  getTestValidItemContentArray(length)(content);
};

// api.one()
test(`api.one(${validHNStoryId}) return Hacker News item object`, async () =>
  console.log("test api.one()") ||
  (await api.one(validHNStoryId).then(testValidItemContent)));

// api.many
test(`api.many([${validHNStoryIds}]) return array of ${
  validHNStoryIds.length
} Hacker News items object`, async () =>
  await api
    .many(validHNStoryIds)
    .then(res => testItemsLengthEqual(res, validHNStoryIds.length)));

/**
 * api.latest()
 */
test(
  "api.latest() returns array of " +
    api.DEFAULT_RESULT_LIMIT +
    " Hacker News items object",
  async () =>
    await api
      .latest()
      .then(getTestValidItemContentArray(api.DEFAULT_RESULT_LIMIT))
);

test(`api.latest(${api.DEFAULT_RESULT_LIMIT}, '${
  api.TYPE_ID
}') returns array of ${
  api.DEFAULT_RESULT_LIMIT
} Hacker News items id only`, async () =>
  await api
    .latest(api.DEFAULT_RESULT_LIMIT, api.TYPE_ID)
    .then(getTestValidItemIdArray(api.DEFAULT_RESULT_LIMIT)));

test(`api.latest(${
  api.DEFAULT_RESULT_LIMIT
}, 'both') returns { ids, content } of fetched Hacker News items`, async () =>
  await api
    .latest(api.DEFAULT_RESULT_LIMIT, api.TYPE_BOTH)
    .then(getTestValidItemBothArray(api.DEFAULT_RESULT_LIMIT)));

test(`api.latest(${customFilter.name}) accepts custom filter`, async () =>
  await api.latest(customFilter));

/**
 * api.top()
 */
test(`api.top() returns array of top ${
  api.DEFAULT_RESULT_LIMIT
} Hacker News items content`, async () =>
  await api.top().then(getTestValidItemContentArray(api.DEFAULT_RESULT_LIMIT)));

test(`api.top(${api.DEFAULT_RESULT_LIMIT}, '${
  api.TYPE_ID
}') returns array of top ${
  api.DEFAULT_RESULT_LIMIT
} Hacker News items id only`, async () =>
  await api
    .top(api.DEFAULT_RESULT_LIMIT, api.TYPE_ID)
    .then(getTestValidItemIdArray(api.DEFAULT_RESULT_LIMIT)));

test(`api.top(${
  api.DEFAULT_RESULT_LIMIT
}, 'both') returns { ids, content } of fetched Hacker News items`, async () =>
  await api
    .top(api.DEFAULT_RESULT_LIMIT, api.TYPE_BOTH)
    .then(getTestValidItemBothArray(api.DEFAULT_RESULT_LIMIT)));

test(`api.top(${customFilter.name}) accepts custom filter`, async () =>
  await api.top(customFilter));
