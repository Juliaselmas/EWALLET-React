import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../redux/cardSlice";

const DeleteInactiveCards = () => {
const dispatch = useDispatch();

const cards = useSelector((state) => state.cards.cards);
const activeCardId = useSelector((state) => state.cards.activeCardId);
const inactiveCards = cards.filter(card => card.id !== activeCardId);

const handleDeleteInactiveCards = () => {
    inactiveCards.forEach(card => dispatch(deleteCard(card.id)));
};

return (
    <div>
        <button onClick={handleDeleteInactiveCards} disabled={inactiveCards.length === 0}>
            Delete all inactive Cards
        </button>
    </div>
)
};

export default DeleteInactiveCards;