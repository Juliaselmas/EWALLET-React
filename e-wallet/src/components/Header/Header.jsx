import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderCSS from './Header.module.css';

const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <header className={HeaderCSS.header}>
            {!isHomePage && (
                <Link to="/"><button>Back to homepage</button></Link>
            )}
        </header>
    )
}

export default Header;