import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => console.error('Error fetching blog:', error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/blogs/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error('Error deleting blog:', error));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = { user, comment, date: new Date().toISOString() };

    axios.post(`http://localhost:5000/api/blogs/${id}/comments`, newComment)
      .then(response => {
        setBlog(response.data);
        setComment('');
        setUser('');
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  return (
    <div className="container">
      {blog ? (
        <div>
          <h1>{blog.title}</h1>
          <p><strong>Author:</strong> {blog.author}</p>
          <p><strong>Publication Date:</strong> {new Date(blog.publicationDate).toLocaleDateString()}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          <div>
            <button onClick={() => navigate(`/edit/${blog._id}`)}>Edit</button>
            <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: '#f44336' }}>Delete</button>
          </div>
          <div>
            <h2>Comments</h2>
            {blog.comments.length ? (
              <ul>
                {blog.comments.map((comment, index) => (
                  <li key={index}>
                    <p><strong>{comment.user}</strong> on {new Date(comment.date).toLocaleDateString()}</p>
                    <p>{comment.comment}</p>
                  </li>
                ))}
                <CommentSection blogId={id} />
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
            <h3>Add a Comment</h3>
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder="Your name"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <textarea
                placeholder="Your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button type="submit">Post Comment</button>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogDetail;