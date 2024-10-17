import React from 'react';
import { Link } from 'react-router-dom';

import CardDisplayCSS from './CardDisplay.module.css';

const CardDisplay = ({ 
    issuer = "XXXXX", 
    number = "XXXX XXXX XXXX XXXX", 
    owner = "XXXXX XXXXX", 
    expire = "XX/XX", 
    ccv = "XXX", 
    ccvHidden = true 
}) => {

    const getCardClass = (issuer) => {
        switch (issuer) {
          case "Mastercard":
            return CardDisplayCSS.CardMasterCard;
          case "Visa":
            return CardDisplayCSS.CardVisa;
          case "American Express":
            return CardDisplayCSS.CardAmericanExpress;
          default:
            return CardDisplayCSS.Card; // Default stil om ingen issuer matchar
        }
      };;

  return (
    <div className={getCardClass(issuer)}>
      <h2 className={CardDisplayCSS.CardIssuer}>{issuer}</h2>
      <h3 className={CardDisplayCSS.CardNumber}>{number}</h3>
      <p className={CardDisplayCSS.CardOwner}>{owner}</p>
      <div className={CardDisplayCSS.CardExpireCcvContainer}>
      <p className={CardDisplayCSS.CardExpire}>{expire}</p>
      <p className={CardDisplayCSS.CardCcv}>{ccvHidden ? "***" : ccv}</p>
      </div>
       
    </div>
  );
};

export default CardDisplay;
