import React from "react";
import PropTypes from "prop-types";
import DataLoader from "./helpers/DataLoader";
import Paginator from "./helpers/Paginator";

const ContentFeeder = ({
  loader,
  render,
  button: LoadMoreButton,
  perPage,
  page
}) => {
  const [{ currentPage, allContents }, setState] = React.useState({
    currentPage: page,
    allContents: []
  });
  /**
   * Just a separated component for readability
   */
  const Result = ({ page, contents, render }) => (
    <>
      {render(contents)}
      <LoadMoreButton
        onClick={() =>
          setState({
            currentPage: page + 1,
            allContents: contents
          })
        }
      />
    </>
  );

  return (
    <DataLoader
      loader={loader}
      render={content => (
        <Paginator
          page={currentPage}
          contents={content}
          perPage={perPage}
          render={paginatedContent => (
            <Result
              page={currentPage}
              contents={[...allContents, ...paginatedContent]}
              render={render}
            />
          )}
        />
      )}
    />
  );
};

ContentFeeder.defaultProps = {
  render: contents => (
    <>
      {contents.map(content => (
        <p>{content}</p>
      ))}
    </>
  ),
  button: props => <button {...props}>Load More</button>,
  perPage: 5,
  page: 1
};
ContentFeeder.propTypes = {
  loader: PropTypes.func.isRequired,
  render: PropTypes.func,
  button: PropTypes.func,
  perPage: PropTypes.number,
  page: PropTypes.number
};

export default ContentFeeder;
