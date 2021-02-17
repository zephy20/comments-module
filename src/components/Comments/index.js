import React from "react";
import AddComment from "./AddComment";
import Comments from "./Comments";
import Dropdown from "./Dropdown";
import "./styles/wrapper.css";

export default function CommentsWrapper({
  comments,
  users,
  activeUser,
  addComment,
  deleteComment,
  handleChangeActiveUser
}) {
  return (
    <div className="commentWrapper">
      <div className="titleText">
        <span>Comments</span>
      </div>

      <hr className="divider" />
      <Dropdown
        activeUser={activeUser}
        users={users}
        handleChangeActiveUser={handleChangeActiveUser}
      />
      <Comments
        comments={comments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
      <AddComment addComment={addComment} />
    </div>
  );
}
