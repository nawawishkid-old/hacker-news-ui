import axios from "axios";
import {
  API_URL_LATEST_STORIES,
  API_URL_ITEM,
  API_URL_TOP_STORIES
} from "./config";

/**
 * Fetch single HN item
 *
 * @param {Number} id HN item id.
 * @return {Promise} axios response.
 */
function one(id) {
  const url = API_URL_ITEM + "/" + id + ".json";

  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => console.log(err));
}

/**
 * Fetch multiple HN items by given array of id.
 *
 * @param {Number[]} ids Array of HN item id.
 * @return {Promise} Array of HN items object.
 */
function many(ids) {
  const promises = [];

  ids.forEach(id => promises.push(one(id)));

  return Promise.all(promises);
}

/**
 * Fetch HN latest stories id.
 *
 * @typedef ReturnType
 * @property {String} ID "id"
 * @property {String} Content "content"
 * @property {String} Both "both"
 *
 * @param {Number} limit Number of fetched ids to be returned.
 * @param {ReturnType} output Return types
 *
 * @return {Promise} Array of HN items based on output param.
 */
function latest(limit = DEFAULT_RESULT_LIMIT, output = TYPE_CONTENT) {
  return axios
    .get(API_URL_LATEST_STORIES)
    .then(res => {
      const filteredIds = res.data.filter(getFilterCallback(limit));

      return oneOrBoth(filteredIds, output);
    })
    .catch(err => console.log(err));
}

/**
 * Fetch HN top stories id.
 *
 * @param {Number} limit Number of fetched ids to be returned.
 * @param {ReturnType} output Return types
 *
 * @return {Promise} Array of HN items based on output param.
 */
function top(limit = DEFAULT_RESULT_LIMIT, output = TYPE_CONTENT) {
  return axios
    .get(API_URL_TOP_STORIES)
    .then(res => {
      const filteredIds = res.data.filter(getFilterCallback(limit));

      return oneOrBoth(filteredIds, output);
    })
    .catch(err => console.log(err));
}

/**
 * Get callback function for filtering fetched HN items.
 *
 * @param {Number | Function} limit Number of fetched HN items to be returned, or callback function to be used as a filter.
 * @return {Function} Filter function.
 */
const getFilterCallback = limit =>
  typeof limit === "function" ? limit : (id, index) => index < limit;

/**
 * Decide whether to return array of HN id or content object,
 * or object of both ids and content based on specifc return type.
 *
 * @param {Number[]} ids Array of HN id.
 * @param {ReturnType} output Return types
 *
 * @return {Promise} Array of HN items based on output param.
 */
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

export const TYPE_CONTENT = "content";
export const TYPE_ID = "id";
export const TYPE_BOTH = "both";
export const DEFAULT_RESULT_LIMIT = 25;
export { one, many, latest, top };
