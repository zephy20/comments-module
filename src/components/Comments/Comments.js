import React, { useState } from "react";
import "./styles/comment.css";
import dayjs from "dayjs";
import fromNow from "dayjs/plugin/relativeTime";
import AddComment from "./AddComment";

dayjs.extend(fromNow);

export default function Comments({ comments, addComment, deleteComment }) {
  return (
    <div className="commentsWrapper">
      {comments.map((item, idx) => (
        <Comment
          key={item.cId}
          {...item}
          isLastComment={idx === comments.length - 1}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
}

const Comment = ({
  authorProfilePic,
  authorName,
  commentText,
  createdAt,
  cId,
  addComment,
  deleteComment,
  replies,
  isLastComment
}) => {
  const [isReplyBox, setIsReplyBox] = useState(false);

  function addReply() {
    setIsReplyBox(false);
    addComment(...arguments);
  }

  return (
    <div className="mainWrapper">
      <div className="commentContainer">
        <div className="commentAvatarContainer">
          <img src={authorProfilePic} className="commentAvatarImage" />
          {!isLastComment && replies.length > 0 && (
            <div className="connectorWrapper">
              <div className="connectorLine" />
            </div>
          )}
        </div>
        <div className="infoWrapper">
          <div className="topSection bottomSpacingSmall">
            <span
              style={{
                fontSize: "14px"
              }}
            >
              {authorName}
            </span>
            <span className="commentTime leftSpacingSmall">
              {dayjs(createdAt).fromNow()}
            </span>
          </div>
          <div className="midSection bottomSpacingSmall">
            <span>{commentText}</span>
          </div>
          <div className="bottomSection">
            <div className="commentTime">
              <span
                className="pointerCursor"
                onClick={() => setIsReplyBox(!isReplyBox)}
              >
                Reply
              </span>
              <span
                className="pointerCursor leftSpacingSmall"
                onClick={() => deleteComment(cId)}
                style={{
                  color: "#921515"
                }}
              >
                Delete
              </span>
            </div>
            {isReplyBox && <AddComment parentId={cId} addComment={addReply} />}
          </div>
          {replies.length > 0 && (
            <Comments
              comments={replies}
              addComment={addComment}
              deleteComment={deleteComment}
            />
          )}
        </div>
      </div>
    </div>
  );
};
