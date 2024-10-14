import { Link } from "react-router-dom"
import { useLocation, useParams } from "react-router-dom"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from "../redux/cardSlice";
import { useNavigate } from 'react-router-dom';

function AddCard() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [owner, setOwner] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();  
    const cards = useSelector((state) => state.cards.cards);

    const handleSubmit = (e) => {
        e.preventDefault();
        let newCard = {
            id: Date.now(), //unikt ID för varje kort. använd annan metod?
            name,
            number,
            owner,
        };
        dispatch(addCard(newCard)); //"dispatchar" det nya kortet som ska bli aktivt
        navigate("/"); //navigerar tillbaks till homepage efter tillägg
    };


    return (
        <div>
        <h1>Add New Card</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Card Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Card Number:
            <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
          </label>
          <label>
            Owner Name:
            <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
          </label>
          <button type="submit">Add Card</button>
        </form>
      </div>
    );
  }
  
  export default AddCard
  
