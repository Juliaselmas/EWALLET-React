import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../redux/cardSlice";
import { useNavigate } from "react-router-dom";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import AddCardInputs from "../components/AddCardInputs/AddCardInputs";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!issuer || !number || !firstName || !lastName || !expireMonth || !expireYear || !ccv) {
      setError("Unable to add card. Please submit all required info");
      return;
    }

    const rawNumber = number.replace(/\s+/g, ""); // Ta bort formateringen för validering

    if (!isCardNumberValid(rawNumber)) {
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
      id: Date.now(),
      issuer,
      number: rawNumber.replace(/(\d{4})(?=\d)/g, "$1 "), // Formatera igen för lagring
      owner: `${firstName} ${lastName}`,
      expire: `${expireMonth}/${expireYear}`,
      ccv,
    };

    dispatch(addCard(newCard));
    navigate("/");
  };

  return (
    <div className="AddNewCardContainer">
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
        <AddCardInputs
          issuer={issuer}
          setIssuer={setIssuer}
          number={number}
          setNumber={setNumber}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          expireMonth={expireMonth}
          setExpireMonth={setExpireMonth}
          expireYear={expireYear}
          setExpireYear={setExpireYear}
          ccv={ccv}
          setCcv={setCcv}
        />
      </form>
    </div>
  );
}

export default AddCard;
