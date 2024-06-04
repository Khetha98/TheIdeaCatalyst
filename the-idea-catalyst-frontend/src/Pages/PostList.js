import React from "react";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post, index) => (
        <div key={index} className="post-item">
          {post.type === "text" && <p>{post.content}</p>}
          {post.type === "image" && post.file && (
            <img src={URL.createObjectURL(post.file)} alt="Post content" />
          )}
          {post.type === "video" && post.file && (
            <video controls>
              <source src={URL.createObjectURL(post.file)} type="video/mp4" />
            </video>
          )}
          <span className="timestamp">{post.timestamp.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default PostList;
