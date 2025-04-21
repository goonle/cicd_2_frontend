import React from 'react';
import styles from './BlogCard.module.css';
// import styles from './BlogDetail.module.css';
const BlogCard = (props) => {
  const { blog } = props;
  
  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <div className={`${styles.header}`}>
          <div className={styles.flexContainer}>
            <h2>{blog.title}</h2>
            <button className={styles.closeButton} onClick={props.clickClose}>X</button>
          </div>
          <p className={styles.meta}>
            by <strong>{blog.author}</strong> | {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.content}>
          <p>{blog.content}</p>
        </div>
        <div className={styles.footer}>
          ❤️ {blog.likes_count} {blog.likes_count === 1 ? 'like' : 'likes'}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;