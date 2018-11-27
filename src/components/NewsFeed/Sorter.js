import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const NewsFeedSorter = styled(({ sortTypes, select, onClick, className }) => {
  return (
    <div className={"newsfeed-sorter " + className}>
      {sortTypes.map((type, index) => (
        <button
          key={index}
          style={{ opacity: type !== select ? 0.5 : 1 }}
          onClick={() => onClick(type)}
        >
          {type[0].toUpperCase() + type.substring(1)}
        </button>
      ))}
    </div>
  );
})``;

NewsFeedSorter.propTypes = {
  sortTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  select: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default NewsFeedSorter;
