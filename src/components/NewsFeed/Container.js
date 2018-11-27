import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NewsFeedSorter from "./Sorter";
import NewsFeedBoard from "./Board";
import NewsFeedItem from "./Item";
import NewsFeedLoadButton from "./LoadButton";
import * as api from "../../api";

const SORT_TYPE_TOP = "top";
const SORT_TYPE_LATEST = "latest";
const sortTypes = [SORT_TYPE_TOP, SORT_TYPE_LATEST];
const initialState = {
  storiesContent: [],
  storiesId: [],
  currentPage: 0
};

/**
 * Get filter function for paginate HN items array.
 *
 * @param {Number} page Page index
 * @return {Function} pagination filter
 */
function getPaginationFilter(pageNumber, itemsPerLoad) {
  const storiesFrom = pageNumber * itemsPerLoad;
  const storiesBefore = storiesFrom + itemsPerLoad;

  return (id, index) => index < storiesBefore && index >= storiesFrom;
}

function firstLoad(ids, itemsPerLoad, setState) {
  api.many(ids.filter(getPaginationFilter(0, itemsPerLoad))).then(content => {
    setState({
      ...initialState,
      storiesContent: content,
      storiesId: ids,
      currentPage: initialState.currentPage + 1
    });
  });
}

/**
 * Fetch more HN items
 *
 * @param {Number[]} ids Array of fetched HN items id.
 * @param {Function} setState setState function of React.useState()
 */
function loadMoreNews(ids, setState) {
  api.many(ids).then(content => {
    // Merge previous state
    setState(({ storiesContent, currentPage, ...rest }) => {
      return {
        ...rest,
        storiesContent: [...storiesContent, ...content],
        currentPage: currentPage + 1
      };
    });
  });
}

const NewsFeedContainer = styled(props => {
  const { itemsPerLoad } = props;
  const [{ storiesId, storiesContent, currentPage }, setState] = React.useState(
    initialState
  );
  const [sortType, setSortType] = React.useState(props.sortType);

  function handleSorterClick(selectedSortType) {
    if (sortType === selectedSortType) {
      return;
    }

    api[selectedSortType](500, api.TYPE_ID).then(ids => {
      firstLoad(ids, itemsPerLoad, setState);
      setSortType(selectedSortType);
    });
  }

  // onDidMount
  let subscribe = true;
  React.useEffect(() => {
    api[sortType](500, api.TYPE_ID).then(ids => {
      if (!subscribe) {
        return;
      }
      firstLoad(ids, itemsPerLoad, setState);
    });

    return () => (subscribe = false);
  }, []);

  return (
    <div className={"newsfeed " + props.className}>
      <NewsFeedSorter
        sortTypes={sortTypes}
        select={sortType}
        onClick={handleSorterClick}
      />
      <NewsFeedBoard>
        {storiesContent.map((item, index) => (
          <NewsFeedItem key={index} data={item} order={index + 1} />
        ))}
      </NewsFeedBoard>
      <NewsFeedLoadButton
        onClick={() =>
          loadMoreNews(
            storiesId.filter(getPaginationFilter(currentPage, itemsPerLoad)),
            setState
          )
        }
      />
    </div>
  );
})`
  background-color: #f4f4f4;
`;

NewsFeedContainer.defaultProps = { sortType: SORT_TYPE_TOP, itemsPerLoad: 5 };
NewsFeedContainer.propTypes = {
  sortType: PropTypes.oneOf(sortTypes),
  itemsPerLoad: PropTypes.number
};

export default NewsFeedContainer;
