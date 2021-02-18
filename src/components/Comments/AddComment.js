import React, { useState } from "react";
import { AddCommentIcon } from "./assets";
import "./styles/addComment.css";

export default function AddComment({ addComment, parentId }) {
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");

  const handleOnChange = e => {
    setInputVal(e.target.value);
  };

  const submitComment = () => {
    if (inputVal) {
      addComment(inputVal, parentId);
      setInputVal("");
    } else {
      setError("Comment can't be empty!");
    }
  };

  return (
    <div className="inputBoxContainer">
      <textarea
        value={inputVal}
        className="inputBox"
        placeholder="Enter comment..."
        onChange={handleOnChange}
      />
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "5px",
            fontSize: "15px"
          }}
        >
          {error}
        </div>
      )}

      <div className="buttonContainer">
        <button
          className="addCommentButton flex alignItemsCenter"
          onClick={submitComment}
        >
          <AddCommentIcon className="svgIcon" />
          <span className="leftSpacingMed">
            {parentId ? "Add Reply" : "Add Comment"}
          </span>
        </button>
      </div>
    </div>
  );
}
