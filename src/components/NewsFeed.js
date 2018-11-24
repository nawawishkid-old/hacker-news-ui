import React from "react";
import styled from "styled-components";
import NewsFeedItem from "./NewsFeedItem";
import * as api from "../api";

const NewsFeedSorter = styled(({ type, onClick, ...rest }) => {
  const sortTypes = ["top", "latest"];

  return (
    <div {...rest}>
      {sortTypes.map((sortType, index) => (
        <button
          key={index}
          style={{ opacity: sortType !== type ? 0.5 : 1 }}
          onClick={() => onClick(sortType)}
        >
          {sortType[0].toUpperCase() + sortType.substring(1)}
        </button>
      ))}
    </div>
  );
})``;

const LoadMoreButton = styled(props => (
  <center>
    <button {...props}>Load More</button>
  </center>
))``;

const NewsFeed = styled.div`
  background-color: #f4f4f4;
`;

const NewsFeedBoard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default props => {
  const initialState = {
    storiesContent: [],
    storiesId: [],
    currentPage: 0
  };
  const itemsPerPage = props.limit || 5;
  const [{ storiesId, storiesContent, currentPage }, setState] = React.useState(
    initialState
  );
  const [sortType, setSortType] = React.useState(getDefaultSortType());

  function getDefaultSortType() {
    console.log("getDefaultSortType()");
    const { sortType } = props;
    console.log("-- start log");
    console.log("props.sortType: ", sortType);
    console.log("-- end log");

    return sortType !== "top" && sortType !== "latest" ? "top" : sortType;
  }

  function getPaginationFilter(page = currentPage) {
    const storiesFrom = page * itemsPerPage;

    return (id, index) =>
      index < storiesFrom + itemsPerPage && index >= storiesFrom;
  }

  function loadMoreNews(ids) {
    api.many(ids.filter(getPaginationFilter())).then(content => {
      setState(({ storiesContent, currentPage, ...rest }) => {
        return {
          ...rest,
          storiesContent: [...storiesContent, ...content],
          currentPage: currentPage + 1
        };
      });
    });
  }

  function firstLoad(ids) {
    api.many(ids.filter(getPaginationFilter(0))).then(content => {
      setState({
        ...initialState,
        storiesContent: content,
        storiesId: ids,
        currentPage: initialState.currentPage + 1
      });
    });
  }

  function handleSorterClick(selectedSortType) {
    if (sortType === selectedSortType) {
      return;
    }

    api[selectedSortType](500, "id").then(ids => {
      firstLoad(ids);
      setSortType(selectedSortType);
    });
  }

  // onDidMount
  React.useEffect(() => {
    api[sortType](500, "id").then(firstLoad);
  }, []);

  return (
    <NewsFeed>
      <NewsFeedSorter type={sortType} onClick={handleSorterClick} />
      <NewsFeedBoard>
        {storiesContent.map((item, index) => (
          <NewsFeedItem key={index} data={item} order={index + 1} />
        ))}
      </NewsFeedBoard>
      <LoadMoreButton onClick={() => loadMoreNews(storiesId)} />
    </NewsFeed>
  );
};
