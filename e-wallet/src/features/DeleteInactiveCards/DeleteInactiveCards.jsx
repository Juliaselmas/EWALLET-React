import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../redux/cardSlice";

const DeleteInactiveCards = () => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.cards.cards);
  const activeCardId = useSelector((state) => state.cards.activeCardId);
  const inactiveCards = cards.filter((card) => card.id !== activeCardId);

  const [buttonVisible, setButtonVisible] = useState(true);

  const handleDeleteInactiveCards = () => {
    inactiveCards.forEach((card) => dispatch(deleteCard(card.id)));
    setButtonVisible(false); 
  };

  return (
    <div>
      {buttonVisible && inactiveCards.length > 0 && (
        <button
          className="DeleteInactiveCardsBtn"
          onClick={handleDeleteInactiveCards}
        >
          Delete all inactive Cards
        </button>
      )}
    </div>
  );
};

export default DeleteInactiveCards;
