import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
function Post({ username, caption, imageUrl, avatarUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="Royal_lobster" src={avatarUrl} />
        <h3 className="post__header_username">{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <strong>{username} </strong>
        {caption}
      </h4>
    </div>
  );
}

export default Post;
