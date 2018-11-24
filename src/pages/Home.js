import React from "react";
import MainLayout from "../layouts/Main";
import NewsFeed from "../components/NewsFeed";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

const NewsFeedWithRouter = withRouter(({ location }) => {
  const parsedQueryString = queryString.parse(location.search);
  console.log("-- start log");
  console.log("parsedQueryString: ", parsedQueryString);
  console.log("-- end log");
  return <NewsFeed sortType={parsedQueryString} />;
});

const Home = () => (
  <MainLayout>
    <NewsFeedWithRouter />
  </MainLayout>
);

export { Home };
export default Home;
