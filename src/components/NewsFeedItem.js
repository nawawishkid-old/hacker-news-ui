import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
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
const CardTitle = styled(({ data, order, className }) => (
  <div className={"title " + className}>
    {order + ". "}
    <a href={data.url ? data.url : "/news/" + data.id} title={data.title}>
      {data.title}
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
    ${Card}:hover &,
    ${Card}:hover & > a {
      // left: -100%;
      color: transparent;
      text-shadow: 0 0 3px pink;
    }
  }
`;
const CardDetail = styled(({ data, className }) => {
  const { url, id, descendants } = data;

  return (
    <div className={"detail " + className}>
      {url ? (
        <Link to={url} title="Go to link" className="link">
          Link
        </Link>
      ) : null}
      <Link to={"/news/" + id} title="Discussion" className="discussion">
        Discussion {descendants > 0 ? `(${descendants})` : ""}
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

    ${Card}:hover & {
      right: 100%;
      background-color: rgba(255, 255, 255, 0.1);
    }
    ${Card}:hover & > a.link {
      display: block;
    }
  }
`;

export default ({ data, order }) => (
  <Card>
    <CardTitle data={data} order={order} />
    <CardDetail data={data} />
  </Card>
);
