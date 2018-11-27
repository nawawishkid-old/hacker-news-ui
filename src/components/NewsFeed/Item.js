import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NewsFeedItem = styled(({ data, order, className }) => (
  <div className={"newsfeed-item " + className}>
    <Title data={data} order={order} />
    <Detail data={data} />
  </div>
))`
  max-width: 600px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 4px -1px #ccc;
  // padding: 1em;
  margin: 0.5em;
  // flex: 0 0 600px;
  background-color: white;
  overflow: hidden;
  transition: box-shadow 0.4s;

  & > div {
    width: 100%;
    @media screen and (min-width: 768px) {
      flex-shrink: 0;
    }
    position: relative;
    transition: left 0.4s, right 0.4s;
  }
  &:hover {
    box-shadow: 0 5px 5px -1px #ccc;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    width: 600px;

    &:hover {
      box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.1), 0 5px 5px -1px #ccc;
    }
  }

  @media screen and (min-width: px) {
  }
`;

NewsFeedItem.propTypes = {
  data: PropTypes.object.isRequired,
  order: PropTypes.number.isRequired
};

const Title = styled(({ data, order, className }) => (
  <div className={"newsfeed-item-title " + className}>
    <a href={data.url ? data.url : "/news/" + data.id} title={data.title}>
      {order + ". " + data.title}
    </a>
  </div>
))`
  left: 0;
  padding: 1em;
  transition: color 0.4s linear 0.4s, text-shadow 0.4s linear 0.4s;

  & > a {
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    ${NewsFeedItem}:hover &,
    ${NewsFeedItem}:hover & > a {
      // left: -100%;
      color: transparent;
      text-shadow: 0 0 3px pink;
    }
  }
`;

Title.propTypes = {
  data: PropTypes.object.isRequired,
  order: PropTypes.number.isRequired
};

const Detail = styled(({ data, className }) => {
  const { url, id, descendants } = data;
  const discussionTitle = `Discussion${
    descendants > 0 ? ` (${descendants})` : ""
  }`;

  return (
    <div className={"newsfeed-item-detail " + className}>
      {url ? (
        <a href={url} title="Go to link" className="link">
          Link
        </a>
      ) : null}
      <Link to={"/news/" + id} title={discussionTitle} className="discussion">
        {discussionTitle}
      </Link>
    </div>
  );
})`
  display: flex;
  justify-content: space-around;

  & > a {
    // width: 100%;
    // text-align: center;
    padding: 1em;
    margin: 0.25em;
    opacity: 0.65;
    transition: background-color 0.4s linear 0.4s;
  }

  & > a.link {
    // border-right: 0.5px solid rgba(0, 0, 0, 0.2);
    display: none;
  }

  & > a:hover {
    // background-color: #f2f2f2;
    font-weight: bold;
  }

  @media screen and (min-width: 768px) {
    right: 0;

    ${NewsFeedItem}:hover & {
      right: 100%;
      background-color: rgba(255, 255, 255, 0.1);
    }
    ${NewsFeedItem}:hover & > a.link {
      display: block;
    }
  }
`;

Detail.propTypes = {
  data: PropTypes.object.isRequired
};

export default NewsFeedItem;
