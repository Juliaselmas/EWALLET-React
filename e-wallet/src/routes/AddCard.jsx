import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../redux/cardSlice";
import { useNavigate } from "react-router-dom";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import { isCardNumberValid, isNameValid, isExpirationDateValid, isCcvValid } from "../helpers/validation";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    //kollar om alla fält är ifyllda
    if (!issuer || !number || !firstName || !lastName || !expireMonth || !expireYear || !ccv) {
      setError("Unable to add card. Please submit all required info");
      return;
    }

    //valideringsfunktioner
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

    if (!isCcvValid(ccv)) {
      setError("Invalid CCV. Must be 3 digits.");
      return;
    }

    const newCard = {
      id: Date.now(), // Unikt ID för varje kort
      issuer,
      number: number.replace(/\s+/g, '').replace(/(\d{4})(?=\d)/g, '$1 '), // Formatera kortnumret
      owner: `${firstName} ${lastName}`,
      expire: `${expireMonth}/${expireYear}`,
      ccv,
    };

    dispatch(addCard(newCard)); // Dispatchar det nya kortet som ska bli aktivt
    navigate("/"); // Navigerar tillbaka till hemsidan efter att kortet lagts till
  };

  return (
    <div className="AddNewCardContainer">
      <h1>Add New Card</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

  
      <CardDisplay 
        issuer={issuer || "XXXXX"} 
        number={number || "XXXX XXXX XXXX XXXX"} 
        owner={`${firstName || "XXXXX"} ${lastName || "XXXXX"}`} 
        expire={`${expireMonth || "XX"}/${expireYear || "XX"}`}
        ccv={ccv || "XXX"}
        ccvHidden={false} 
      />

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
            maxLength={19}
          />
        </label>

        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label>
          Expiry Month (MM):
          <input
            type="text"
            value={expireMonth}
            placeholder="MM"
            maxLength={2}
            onChange={(e) => setExpireMonth(e.target.value)}
          />
        </label>

        <label>
          Expiry Year (YY):
          <input
            type="text"
            value={expireYear}
            placeholder="YY"
            maxLength={2}
            onChange={(e) => setExpireYear(e.target.value)}
          />
        </label>

        <label>
          CCV:
          <input
            type="text"
            value={ccv}
            placeholder="XXX"
            maxLength={3}
            onChange={(e) => setCcv(e.target.value)}
          />
        </label>

        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}

export default AddCard;
