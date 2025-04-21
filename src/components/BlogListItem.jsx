import React from 'react';
import styles from './BlogListItem.module.css';

const BlogListItem = ({ blog, onClick }) => {
    return (
        <tr className={`${styles.itemRow}`} onClick={onClick}>
            <td>{blog.title}</td>
            <td>{blog.content}</td>
            <td> {blog.author}</td>
            <td>{blog.likes_count}</td>
        </tr>
    );
}
export default BlogListItem;