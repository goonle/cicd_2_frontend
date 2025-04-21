import React, { useEffect, useState } from 'react';
import { AUTH_GET } from '../utils/api-helper';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import styles from './BlogMain.module.css';

import BlogCard from '../components/BlogCard';
import NavBar from '../components/NavBar';
import BlogListItem from '../components/BlogListItem';
import BlogDetail from '../components/BlogDetail';

const BlogMain = () => {
    const { handleToast } = useToast();
    const [selectBog, setSelectBlog] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [detailType, setDetailType] = useState("create");


    const [showDetail, setShowDetail] = useState(false);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {

        const fetchBlogs = () => {
            const successFunc = (res) => {
                handleToast("Blogs fetched successfully", "success");
                setBlogs(res.data);
                //testcode
                setSelectBlog(res.data[0]);
            }
            const errorFuc = (err) => {
                handleToast("Error fetching blogs", "error");
                console.error('Error fetching blogs:', err);
            }

            const finallyFunc = () => {
                setLoading(false);
            }

            setLoading(true);
            AUTH_GET("blogs/", successFunc, errorFuc, finallyFunc);
        }
        fetchBlogs();
    }, [handleToast]);

    const fetchBlogs = () => {
        const successFunc = (res) => {
            handleToast("Blogs fetched successfully", "success");
            setBlogs(res.data);
            //testcode
            setSelectBlog(res.data[0]);
        }
        const errorFuc = (err) => {
            handleToast("Error fetching blogs", "error");
            console.error('Error fetching blogs:', err);
        }

        const finallyFunc = () => {
            setLoading(false);
        }

        setLoading(true);
        AUTH_GET("blogs/", successFunc, errorFuc, finallyFunc);
    }

    const handlePostClick = () => {
        setShowDetail(true);
        setDetailType("create");
    }
    const handleCloseDetail = () => {
        setShowDetail(false);
    }
    const handleBlogClick = (blog) => {
        setSelectBlog(blog);
        setShowCard(true);
    }
    const handleCloseCard = () => {
        setShowCard(false);
    };
    const refreshBlogs = () => {
        fetchBlogs();
    }

    return (
        <>
            <NavBar />
            {showCard && <BlogCard blog={selectBog} clickClose={handleCloseCard} callbackFunc={refreshBlogs}/>}
            <Loader show={loading} />
            {showDetail && <BlogDetail type={detailType} clickClose={handleCloseDetail} callbackFunc={refreshBlogs} />}
            <div className={"page-centered"}>
                <div >
                    <h1 className={styles.title}>Blog List</h1>
                    <div className={styles.post} onClick={handlePostClick}>Post</div>
                    <div className={`${styles.card}`}>
                        <table style={{ width: '100%', textAlign: 'left', tableLayout: 'fixed' }}>
                            <colgroup>
                                <col style={{ width: '50%' }} />
                                <col style={{ width: '25%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '10%' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th>Likes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.length === 0 ?
                                    <tr>
                                        <td colSpan={4} className={styles.empty}> No blogs found.</td>
                                    </tr>
                                    :
                                    blogs.map(blog => <BlogListItem key={blog.id} blog={blog} onClick={() => handleBlogClick(blog)} />)
                                }
                                {blogs.length < 6 &&
                                    Array.from({ length: 6 - blogs.length }).map((_, i) => (
                                        <tr key={`blank-${i}`}>
                                            <td colSpan={4} style={{ height: "50px" }}></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
};

export default BlogMain;