import React, { useState, useEffect } from 'react';
import styles from './BlogCard.module.css';
import { AUTH_PUT, AUTH_GET_ONE, AUTH_DELETE_ONE } from '../utils/api-helper';
import { useToast } from '../context/ToastContext';
import Loader from './Loader';

const BlogCard = (props) => {
  const { blog } = props;
  const { handleToast } = useToast();
  const [blogData, setBlogData] = useState({
    id: blog.id,
    title: "loading...",
    content: "loading...",
  });
  const [mode, setMode] = useState("view");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const successFunc = (res) => {
      const data = res.data;
      setBlogData(data || { title: "loading...", content: "loading..." });
    }
    const errorFunc = (err) => {
      handleToast("Error fetching blog", "error");
    }

    AUTH_GET_ONE("blogs/", blog.id, successFunc, errorFunc)

  }, [blog.id, handleToast]); // fetch only when blog.id changes

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const content = formData.get('content');
    const blog = { title, content };

    const successFunc = (res) => {
      props.callbackFunc();
      handleToast("Blog updated successfully", "success");
      setMode("view");
      setBlogData(res.data);
      props.clickClose();
    }
    const errorFunc = (err) => {
      handleToast("Error updating blog", "error");
      console.error('Error updating blog:', err);
    }

    setLoading(true);
    AUTH_PUT(`blogs/`, blogData.id, blog, successFunc, errorFunc);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    const successFunc = ()=> {
      setMode("view");
      props.callbackFunc();
      props.clickClose();
    }
    setLoading(true);
    AUTH_DELETE_ONE("blogs/", blogData.id, successFunc)
  }

  return (
    <>
    {<Loader show={loading} />}
      <div className={styles.modal}>
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <div className={`${styles.header}`}>
              <div className={styles.flexContainer}>
                {mode === "view" ?
                  <h2>{blogData.title}</h2> :
                  <input
                    name="title"
                    type="text"
                    value={blogData.title}
                    onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                  />}
                <div className={styles.buttonGroup}>
                  {mode === "view" ?
                    <>
                      <button onClick={() => { setMode("edit") }}>Edit</button>
                      <button onClick={handleDelete}>Delete</button>
                    </> :
                    <button type="submit">Save</button>
                  }
                  <button className={styles.closeButton} onClick={props.clickClose}>X</button>
                </div>
              </div>
              <p className={styles.meta}>
                by <strong>{blogData.author}</strong> | {new Date(blogData.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.content}>
              {mode === "view" ?
                <p>{blogData.content}</p> :
                <textarea
                  name="content"
                  value={blogData.content}
                  onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                />
              }

            </div>
            <div className={styles.footer}>
              ❤️ {blogData.likes_count} {blogData.likes_count === 1 ? 'like' : 'likes'}
            </div>
          </div>

        </form>
      </div>
    </>
  );
};

export default BlogCard;