import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch comments for the specific blog
    axios.get(`http://localhost:5000/api/blogs/${blogId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [blogId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      userName,
      content: newComment,
      blogId,
    };

    // Post new comment
    axios.post(`http://localhost:5000/api/comments`, commentData)
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
        setUserName('');
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      <ul className="comment-list">
        {comments.map(comment => (
          <li key={comment._id} className="comment">
            <strong>{comment.userName}</strong>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>

      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default CommentSection;