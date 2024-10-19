import React from "react";

const EditCardInputs = ({
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
  isActive
}) => {
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ""); 
    if (value.length <= 16 && /^\d*$/.test(value)) { 
      setNumber(value);
    }
  };

  return (
    <>
      <label>
        Card Issuer:
        <select value={issuer} onChange={(e) => setIssuer(e.target.value)} disabled={isActive}>
          <option value="GlobayPay">GlobalPay</option>
          <option value="FlexiCard">FlexiCard</option>
          <option value="Titan Credit">Titan Credit</option>
        </select>
      </label>

      <label>
        Card Number:
        <input 
          type="text" 
          value={number.replace(/(.{4})/g, "$1 ").trim()} 
          maxLength="19"
          disabled={isActive}
          onChange={handleCardNumberChange} 
        />
      </label>

      <label>
        First Name:
        <input type="text" value={firstName} disabled={isActive} onChange={(e) => setFirstName(e.target.value)} />
      </label>

      <label>
        Last Name:
        <input type="text" value={lastName} disabled={isActive} onChange={(e) => setLastName(e.target.value)} />
      </label>

      <label>
        Expiry Month (MM):
        <input type="text" value={expireMonth} disabled={isActive} onChange={(e) => setExpireMonth(e.target.value)} />
      </label>

      <label>
        Expiry Year (YY):
        <input type="text" value={expireYear} disabled={isActive} onChange={(e) => setExpireYear(e.target.value)} />
      </label>

      <label>
        CCV:
        <input type="text" value={ccv} disabled={isActive} onChange={(e) => setCcv(e.target.value)} />
      </label>
    </>
  );
};

export default EditCardInputs;
