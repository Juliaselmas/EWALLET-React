export const isCardNumberValid = (number) => {
  return /^\d{16}$/.test(number.replace(/\s+/g, ""));
};

export const isNameValid = (name) => {
  return /^[a-zA-ZåäöÅÄÖ]+$/.test(name);
};

export const isExpirationDateValid = (month, year) => {
  const now = new Date();
  const expDate = new Date(`20${year}`, month - 1);
  return expDate > now;
};

export const isCcvValid = (ccv) => {
  return ccv.length === 3 && !isNaN(ccv);
};
