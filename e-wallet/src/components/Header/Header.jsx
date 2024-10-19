import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderCSS from './Header.module.css';
import { useParams } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isSettings = location.pathname === "/settings";
    const isAddCard = location.pathname === "/addcard";
    const isCardDetails = location.pathname.startsWith("/card/");

    const cards = useSelector((state) => state.cards.cards);

    return (
        <header className={HeaderCSS.header}>
            {isHomePage && (<h1>E-wallet</h1>)}
            {isSettings && (<h1>Settings</h1>)}
            {isAddCard && (<h1>Add new Card</h1>)}
            {isCardDetails && (<h1>Card Details</h1>)}
            <div className={HeaderCSS.ButtonContainer}>
            {!isHomePage && (
                <Link to="/"><button>Back to homepage</button></Link>
            )} 
            {!isSettings && (
                <Link to="/settings"><button>Settings</button></Link>
            )}
            {!isAddCard && cards.length < 4 && (
        <Link to="/addcard"><button>Add New Card</button></Link>
      )}</div>
        </header>
    )
}

export default Header;