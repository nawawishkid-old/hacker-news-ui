import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import * as api from "../api";
import MainLayout from "../layouts/Main";
import CommentLoader from "../components/Comment/Loader";

const Discussion = styled(({ data, className }) => (
  <div className={"story " + className}>
    <h1>
      <a href={data.url} title={data.title}>
        {data.title}
      </a>
    </h1>
    <CommentLoader commentIds={data.kids} />
  </div>
))`
  padding: 1em;
`;

const DiscussionContainer = ({ storyId }) => {
  const [story, setStory] = React.useState(null);

  React.useEffect(() => {
    api.one(storyId).then(res => setStory(res));
  }, []);

  return story ? <Discussion data={story} /> : "Loading...";
};

const Story = withRouter(({ match }) => (
  <MainLayout>
    <DiscussionContainer storyId={match.params.itemId} />
  </MainLayout>
));

export { Story };
export default Story;
