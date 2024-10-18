import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateCard, deleteCard, setActiveCard} from "../redux/cardSlice";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import EditCardInputs from "../components/EditCardInputs/EditCardInputs";

function Card() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const card = useSelector((state) =>
    state.cards.cards.find((card) => card.id === parseInt(id))
  );

  const activeCardId = useSelector((state) => state.cards.activeCardId);
  const isActive = card.id === activeCardId; 

  //lokala state för att hålla uppdaterade fält
  const [issuer, setIssuer] = useState(card.issuer);
  const [number, setNumber] = useState(card.number);
  const [firstName, setFirstName] = useState(card.owner.split(" ")[0]);
  const [lastName, setLastName] = useState(card.owner.split(" ")[1]);
  const [expireMonth, setExpireMonth] = useState(card.expire.split("/")[0]);
  const [expireYear, setExpireYear] = useState(card.expire.split("/")[1]);
  const [ccv, setCcv] = useState(card.ccv);
  const [error, setError] = useState("");

  const handleUpdate = () => {
    if (!issuer || !number || !firstName || !lastName || !expireMonth || !expireYear || !ccv) {
      setError("Please fill in all required fields");
      return;
    }

    const updatedCard = {
      id: card.id,
      issuer,
      number,
      owner: `${firstName} ${lastName}`,
      expire: `${expireMonth}/${expireYear}`,
      ccv,
    };

    dispatch(updateCard(updatedCard));
    navigate("/");
  };

  const handleDelete = () => {
    if (!isActive) {
      dispatch(deleteCard(card.id));
      navigate("/");
    }
  };

  const handleActivate = () => {
    if (!isActive) {
      dispatch(setActiveCard(card.id));
      navigate("/");
    }
  };

  return (
    <div className="CardInfoContainer">
      <h1>Card Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <CardDisplay 
        issuer={issuer} 
        number={number} 
        owner={`${firstName} ${lastName}`} 
        expire={`${expireMonth}/${expireYear}`}
        ccv={ccv} 
        ccvHidden={false}
      />

      {isActive && <h3 style={{ color: "red" }}>Unable to edit or delete an active card.</h3>}

      <form>
        <EditCardInputs
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
          isActive={isActive}
        />

        {!isActive && (
          <div>
            <button type="button" onClick={handleUpdate}>Update Card</button>
            <button type="button" onClick={handleDelete}>Delete Card</button>
            <button type="button" onClick={handleActivate}>Activate Card</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Card;
