import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="container">
      <h1>Blog List</h1>
      {blogs.map(blog => (
        <div className="blog-preview" key={blog._id}>
          <h2>{blog.title}</h2>
          <Link to={`/blogs/${blog._id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;