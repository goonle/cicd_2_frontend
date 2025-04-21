import React from 'react';
import styles from './BlogDetail.module.css';
import { useToast } from '../context/ToastContext';
import { AUTH_POST } from '../utils/api-helper';

const BlogDetail = (props) => {
    const { handleToast } = useToast();

    const successFunc = (res) => {
        handleToast("Blog created successfully", "success");
    }
    const errorFunc = (err) => {
        handleToast("Error creating blog", "error");
        console.error('Error creating blog:', err);
    }
    const finallyFunc = () => {
        props.clickClose();
        props.callbackFunc();
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const content = formData.get('content');
        const blog = { title, content };

        AUTH_POST(`blogs/`, blog, successFunc, errorFunc, finallyFunc);

    }
    if (props.type === "create") {

    }


    return (
        <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <div className={`${styles.header} ${styles.flexContainer}`}>
                        <input type="text" placeholder="Title" name="title"></input>
                        <button className={styles.closeButton} onClick={props.clickClose}>X</button>
                    </div>
                    <div className={`${styles.flexContainer} `}>
                        <textarea placeholder="content" name="content"></textarea>
                    </div>
                    <div className={`${styles.gab_1} ${styles.flexContainer} `}>
                        <button className={styles.saveButton} type='submit'>Save</button>
                        <button onClick={props.clickClose}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default BlogDetail;