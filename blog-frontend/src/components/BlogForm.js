import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/blogs/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
          setAuthor(response.data.author);
          setPublicationDate(response.data.publicationDate);
        })
        .catch(error => console.error('Error fetching blog:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, content, author, publicationDate };

    if (id) {
      axios.put(`http://localhost:5000/api/blogs/${id}`, blog)
        .then(() => navigate('/'))
        .catch(error => console.error('Error updating blog:', error));
    } else {
      axios.post('http://localhost:5000/api/blogs', blog)
        .then(() => navigate('/'))
        .catch(error => console.error('Error creating blog:', error));
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit Blog' : 'Create Blog'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Publication Date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          required
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your content here..."
        />
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;