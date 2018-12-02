import React from "react";
import * as api from "../../api";
import CommentSingle from "./Single";
import Loader from "../helpers/Loader";

const CommentLoader = ({ commentIds }) => {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    api
      .many(commentIds)
      .then(res => setComments(res.filter(item => !item.deleted)));
  }, []);

  return (
    <Loader
      isLoaded={comments.length > 0}
      loadComponent={() =>
        comments.map((comment, index) => (
          <CommentSingle data={comment} key={index} />
        ))
      }
      waitComponent={() => "รอก่อนนะจ๊ะ..."}
    />
  );
};

export default CommentLoader;
