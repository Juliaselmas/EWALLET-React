import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [], //lagring av kort
  activeCardId: null, //ID för aktivt kort
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      //ett nytt kort blir automatiskt det aktiva kortet
      const newCard = action.payload;
      state.cards.push(newCard); //lägger till ett nytt kort

      //gör det nya kortet aktivt och uppdatera andra kort som inaktiva
      state.activeCardId = newCard.id;
      state.cards = state.cards.map((card) =>
        card.id === newCard.id ? card : { ...card }
      );
    },

    setActiveCard: (state, action) => {
      //sätter ett annat kort som aktivt
      const cardId = action.payload;
      state.activeCardId = cardId;

      //gör alla andra korten inaktiva
      state.cards = state.cards.map((card) =>
        card.id === cardId ? card : { ...card }
      );
    },

    updateCard: (state, action) => {
      //uppdaterar kortets info om det är inaktivt
      const { id, issuer, number, owner, expire, ccv } = action.payload;
      const card = state.cards.find((card) => card.id === id);
      if (card) {
        card.issuer = issuer;
        card.number = number;
        card.owner = owner;
        card.expire = expire;
        card.ccv = ccv;
      }
    },

    deleteCard: (state, action) => {
      //raderar ett kort om det är inaktivt
      const cardId = action.payload;
      state.cards = state.cards.filter((card) => card.id !== cardId);
    },
  },
});

export const { addCard, setActiveCard, updateCard, deleteCard } =
  cardSlice.actions;
export default cardSlice.reducer;

/*
const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      if (state.cards.length < 4) {
        state.cards.push(action.payload);
      }
    },
    setActiveCard: (state, action) => {
      state.activeCardId = action.payload;
    },
  },
});
*/
