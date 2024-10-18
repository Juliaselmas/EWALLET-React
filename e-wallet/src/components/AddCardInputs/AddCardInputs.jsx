import React from "react";

const AddCardInputs = ({
  issuer,
  setIssuer,
  number,
  setNumber,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  expireMonth,
  setExpireMonth,
  expireYear,
  setExpireYear,
  ccv,
  setCcv,
}) => {

  const handleCardNumberChange = (e) => {
    const rawNumber = e.target.value.replace(/\s+/g, ""); // Ta bort mellanslag
    if (rawNumber.length <= 16 && /^\d*$/.test(rawNumber)) {
      setNumber(rawNumber.replace(/(\d{4})(?=\d)/g, "$1 ")); // Lägg till mellanslag var fjärde siffra
    }
  };

  return (
    <>
      <label>
        Card Issuer:
        <select value={issuer} onChange={(e) => setIssuer(e.target.value)}>
          <option value="GlobalPay">GlobalPay</option>
          <option value="FlexiCard">FlexiCard</option>
          <option value="Titan Credit">Titan Credit</option>
        </select>
      </label>

      <label>
        Card Number:
        <input 
          type="text" 
          value={number} 
          maxLength="19" // 16 siffror + 3 mellanrum
          onChange={handleCardNumberChange} 
        />
      </label>

      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>

      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>

      <label>
        Expiry Month (MM):
        <input type="text" value={expireMonth} onChange={(e) => setExpireMonth(e.target.value)} />
      </label>

      <label>
        Expiry Year (YY):
        <input type="text" value={expireYear} onChange={(e) => setExpireYear(e.target.value)} />
      </label>

      <label>
        CCV:
        <input type="text" value={ccv} onChange={(e) => setCcv(e.target.value)} />
      </label>

      <button type="submit">Add Card</button>
    </>
  );
};

export default AddCardInputs;
