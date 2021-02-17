import React, { useState } from "react";
import CommentsWrapper from "../components/Comments";

let currentId = 4;

const DUMMY_COMMENTS = [
  {
    cId: 1,
    authorName: "Matt",
    authorProfilePic: "https://i.pravatar.cc/150?img=60",
    commentText: "How artistic!",
    createdAt: "2021-02-17T06:29:56.000Z",
    replies: [],
    userId: 100,
    parentId: null,
    level: 0
  },
  {
    cId: 2,
    authorName: "Elliot Fu",
    authorProfilePic: "https://i.pravatar.cc/150?img=5",
    commentText: "This has been very useful for my research. Thanks as well!",
    createdAt: "2021-02-17T06:29:58.000Z",
    userId: 101,
    parentId: null,
    level: 0,
    replies: [
      {
        parentId: 2,
        level: 1,
        cId: 3,
        authorName: "Jenny Hess",
        authorProfilePic: "https://i.pravatar.cc/150?img=6",
        commentText: "Elliot you are always so right :)",
        createdAt: "2021-02-17T06:29:03.000Z",
        replies: [],
        userId: 102
      }
    ]
  },
  {
    cId: 4,
    authorName: "Joe Henderson",
    authorProfilePic: "https://i.pravatar.cc/150?img=7",
    commentText: "Dude, this is awesome. Thanks so much",
    createdAt: "2021-02-17T09:06:03.000Z",
    replies: [],
    userId: 103,
    parentId: null,
    level: 0
  }
];

// [
//   { id: 1, child: [] },
//   {
//     id: 3,
//     child: [
//       {
//         id: 5,
//         child: [{ id: 9 }]
//       }
//     ]
//   }
// ];

const DUMMY_USERS = [
  {
    userId: 100,
    userName: "Matt",
    userProfilePic: "https://i.pravatar.cc/150?img=60"
  },
  {
    userId: 101,
    userName: "Elliot Fu",
    userProfilePic: "https://i.pravatar.cc/150?img=5"
  },
  {
    userId: 102,
    userName: "Stevie Feliciano",
    userProfilePic: "https://i.pravatar.cc/150?img=61"
  },
  {
    userId: 103,
    userName: "Christian",
    userProfilePic: "https://i.pravatar.cc/150?img=62"
  },
  {
    userId: 104,
    userName: "Jenny Hess",
    userProfilePic: "https://i.pravatar.cc/150?img=6"
  },
  {
    userId: 105,
    userName: "Justen Kitsune",
    userProfilePic: "https://i.pravatar.cc/150?img=2"
  },
  {
    userId: 106,
    userName: "Joe Henderson",
    userProfilePic: "https://i.pravatar.cc/150?img=7"
  }
];

export default function CommentsContainer() {
  const [comments, setComments] = useState(DUMMY_COMMENTS);
  const [users, setUsers] = useState(DUMMY_USERS);
  const [activeUser, setactiveUser] = useState(DUMMY_USERS[0]);

  const addComment = (newComment, parentId) => {
    const newCommentObj = {
      cId: ++currentId,
      authorName: activeUser.userName,
      authorProfilePic: activeUser.userProfilePic,
      commentText: newComment,
      createdAt: new Date(),
      replies: [],
      userId: activeUser.userId,
      parentId: null,
      level: 0
    };
    if (parentId) {
      const updatedComments = addReplyToAComment(
        comments,
        newCommentObj,
        parentId
      );

      setComments(updatedComments);
    } else {
      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);
    }
  };

  // recursively find the correct parent and adds reply
  const addReplyToAComment = (totalComments, newComment, parentId) => {
    let updatedComments = [...totalComments];
    updatedComments.forEach(cmt => {
      if (cmt.cId === parentId) {
        const updatedNewComment = {
          ...newComment,
          parentId: cmt.cId,
          level: cmt.level + 1
        };
        cmt.replies.push(updatedNewComment);
      } else {
        return addReplyToAComment(cmt.replies, newComment, parentId);
      }
    });
    return updatedComments;
  };

  const deleteComment = cId => {
    const updatedComments = findAndDeleteComment(comments, cId);
    setComments(updatedComments);
  };

  // recursively finds the comment and deletes it
  const findAndDeleteComment = (totalComments, commentId) => {
    return totalComments.filter(item => {
      if ("replies" in item) {
        item.replies = findAndDeleteComment(item.replies, commentId);
      }
      return item.cId !== commentId;
    });
  };

  const handleChangeActiveUser = newUser => {
    setactiveUser(newUser);
  };

  return (
    <CommentsWrapper
      comments={comments}
      users={users}
      activeUser={activeUser}
      addComment={addComment}
      deleteComment={deleteComment}
      handleChangeActiveUser={handleChangeActiveUser}
    />
  );
}
