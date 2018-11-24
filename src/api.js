import axios from "axios";
import {
  API_URL_LATEST_STORIES,
  API_URL_ITEM,
  API_URL_TOP_STORIES
} from "./config";

export const TYPE_CONTENT = "content";
export const TYPE_ID = "id";
export const TYPE_BOTH = "both";
export const DEFAULT_RESULT_LIMIT = 25;

export const one = id => {
  const url = API_URL_ITEM + "/" + id + ".json";

  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const many = async ids => {
  // console.log("api.many()");
  const promises = [];

  ids.forEach(id => promises.push(one(id)));

  return await Promise.all(promises);
};

export const latest = async (
  limit = DEFAULT_RESULT_LIMIT,
  output = TYPE_CONTENT
) =>
  await axios
    .get(API_URL_LATEST_STORIES)
    .then(async res => {
      // console.log("api.latest() then()");
      const filteredIds = res.data.filter(getFilterCallback(limit));
      // const filteredIds = [];
      // let id = res.data;
      // let i = 0;

      // while (getFilterCallback(limit)(id, i++)) {
      //   filteredIds.push(--id);
      // }

      return oneOrBoth(filteredIds, output);
    })
    .catch(err => console.log(err));

export const top = async (
  limit = DEFAULT_RESULT_LIMIT,
  output = TYPE_CONTENT
) =>
  await axios
    .get(API_URL_TOP_STORIES)
    .then(async res => {
      const filteredIds = res.data.filter(getFilterCallback(limit));

      return oneOrBoth(filteredIds, output);
    })
    .catch(err => console.log(err));

/**
 * Below are helper functions
 */
const getFilterCallback = limit =>
  typeof limit === "function" ? limit : (id, index) => index < limit;

const oneOrBoth = async (ids, output) => {
  // console.log("api.helper.oneOrBoth()");
  let result, content;

  if (output === TYPE_ID) {
    return ids;
  }

  content = await many(ids);

  switch (output) {
    case TYPE_CONTENT:
      result = content;
      break;
    case TYPE_BOTH:
      result = { ids, content };
      break;
    default:
      result = content;
  }

  return result;
};
