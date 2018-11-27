import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DEFAULT_TITLE = "Load More";
const NewsFeedLoadButton = styled(({ onClick, title, className }) => (
  <center>
    <button
      onClick={onClick}
      title={title}
      className={"newsfeed-loadbutton " + className}
    >
      {title}
    </button>
  </center>
))``;

NewsFeedLoadButton.defaultProps = { title: DEFAULT_TITLE };
NewsFeedLoadButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export { DEFAULT_TITLE };
export default NewsFeedLoadButton;
