import React from "react";
import NavBar from "../components/NavBar.jsx";

const BlogMain = () => {
    return (
        <div>
            <NavBar />
            <div className="blog-list page-centered">
                <h1>Blog List</h1>
                <p>This is the blog list page.</p>
            </div>
        </div>
    );
}
export default BlogMain;
