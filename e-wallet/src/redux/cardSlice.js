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
      state.cards.push(newCard);
      state.activeCardId = newCard.id;

      //OM det finns ett aktivt kort uppdateras det till inaktivt
      state.cards = state.cards.map((card) =>
        card.id === newCard.id ? card : { ...card }
      );
    },

    setActiveCard: (state, action) => {
      state.activeCardId = action.payload; //sätter det valda kortet som aktivt
    },
  },
});

export const { addCard, setActiveCard } = cardSlice.actions;
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
