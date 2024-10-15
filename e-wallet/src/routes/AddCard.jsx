import { Link } from "react-router-dom"
import { useLocation, useParams } from "react-router-dom"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from "../redux/cardSlice";
import { useNavigate } from 'react-router-dom';

function AddCard() {
    const [issuer, setIssuer] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState("");
    const [expireMonth, setExpireMonth] = useState("");
    const [expireYear, setExpireYear] = useState("");
    const [ccv, setCcv] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();  
    const cards = useSelector((state) => state.cards.cards);

    //validering av kortnummer, 16 siffor) Flytta ut till helpers?
    const isCardNumberValid = (number) => /^\d{16}$/.test(number.replace(/\s+/g, ''));

    //validering av namn, inga siffor. Flytta ut till helpers?
    const isNameValid = (name) => /^[a-zA-Z]+$/.test(name);

    //validering av utgångsdatum, ej passerat. Flytta ut till helpers?
    const isExpirationDateValid = (month, year) => {
       const now = new Date();
       const expDate = new Date(`20${year}`, month - 1);
       return expDate > now; //validerar att det är ett framtidsdatum
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //validering. Flytta ut till egen funktion?
        if (!issuer || !number || !firstName || !lastName || !expireMonth || !expireYear || !ccv) {
          setError("Unable to add card. Please submit all required info");
          return;
      }

      if (!isCardNumberValid(number)) {
          setError("Invalid card number. Must be 16 digits.");
          return;
      }

      if (!isNameValid(firstName) || !isNameValid(lastName)) {
          setError("Names cannot contain numbers.");
          return;
      }

      if (!isExpirationDateValid(expireMonth, expireYear)) {
          setError("Invalid expiration date. Must be in the future.");
          return;
      }

      if (ccv.length !== 3 || isNaN(ccv)) {
          setError("Invalid CCV. Must be 3 digits.");
          return;
      }

        let newCard = {
            id: Date.now(), //unikt ID för varje kort. använd annan metod?
            issuer,
            number: number.replace(/\s+/g, '').replace(/(\d{4})(?=\d)/g, '$1 '), //formattering av kortnummer
            owner: `${firstName} ${lastName}`,
            expire: `${expireMonth}/${expireYear}`,
            ccv,
        };

        dispatch(addCard(newCard)); //"dispatchar" det nya kortet som ska bli aktivt
        navigate("/"); //navigerar tillbaks till homepage efter tillägg
    };


    return (
        <div>
        <h1>Add New Card</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Card Issuer:
                  <select value={issuer} onChange={(e) => setIssuer(e.target.value)}>
                    <option value="">Select Issuer</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Visa">Visa</option>
                    <option value="American Express">American Express</option>
                  </select>
                </label>

            <label>
                Card Number:
                  <input
                    type="text"
                    value={number}
                    placeholder="xxxx xxxx xxxx xxxx"
                    onChange={(e) => setNumber(e.target.value)}
                    maxLength={19}/>
            </label>

            <label>
                First Name:
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
            </label>
            <label>
                Last Name:
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
            </label>

            <label>
                Expiry Month (MM):
                  <input
                    type="text"
                    value={expireMonth}
                    placeholder="MM"
                    maxLength={2}
                    onChange={(e) => setExpireMonth(e.target.value)}/>
            </label>

            <label>
                Expiry Year (YY):
                  <input
                    type="text"
                    value={expireYear}
                    placeholder="YY"
                    maxLength={2}
                    onChange={(e) => setExpireYear(e.target.value)}/>
            </label>

            <label>
                CCV:
                  <input
                    type="text"
                    value={ccv}
                    placeholder="XXX"
                    maxLength={3}
                    onChange={(e) => setCcv(e.target.value)}/>
                </label>

          <button type="submit">Add Card</button>
        </form>
      </div>
    );
  }
  
  export default AddCard
  
