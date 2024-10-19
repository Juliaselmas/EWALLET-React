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
          case "GlobalPay":
            return CardDisplayCSS.CardGlobalPay;
          case "FlexiCard":
            return CardDisplayCSS.CardFlexiCard;
          case "Titan Credit":
            return CardDisplayCSS.CardTitanCredit;
          default:
            return CardDisplayCSS.Card;
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
