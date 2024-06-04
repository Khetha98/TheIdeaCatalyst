import React, { useState } from "react";

const PostForm = ({ onAddPost }) => {
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState("text");
  const [file, setFile] = useState(null);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() || file) {
      const newPost = {
        content: postContent,
        type: postType,
        file: file,
        timestamp: new Date(),
      };
      onAddPost(newPost);
      setPostContent("");
      setFile(null);
    }
  };

  return (
    <div className="post-form">
      <form onSubmit={handlePostSubmit}>
        <div className="form-group">
          <select
            onChange={(e) => setPostType(e.target.value)}
            value={postType}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div className="form-group">
          {postType === "text" && (
            <textarea
              placeholder="Write something..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          )}
          {(postType === "image" || postType === "video") && (
            <input
              type="file"
              accept={postType === "image" ? "image/*" : "video/*"}
              onChange={(e) => setFile(e.target.files[0])}
            />
          )}
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostForm;
