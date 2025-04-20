import React from 'react';
import styles from './NavBar.module.css';

const NavBar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        window.location.href = '/login'; // Redirect to the login page
    };


    return (
        <nav className={styles.navbar} onClick={handleLogout}>
            <div className={styles.logout}>Log Out</div>
        </nav>
    );
}

export default NavBar;
