import React from "react";
import MainLayout from "../layouts/Main";
import NewsFeed from "../components/NewsFeed/Container";

const Home = () => (
  <MainLayout>
    <NewsFeed />
  </MainLayout>
);

export { Home };
export default Home;
