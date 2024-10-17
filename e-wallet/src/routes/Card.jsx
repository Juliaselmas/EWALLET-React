import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateCard, deleteCard, setActiveCard} from "../redux/cardSlice";
import CardDisplay from "../components/CardDisplay/CardDisplay";


function Card() {
  
    const { id } = useParams(); //hämtar id från url
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const card = useSelector((state) =>
    state.cards.cards.find((card) => card.id === parseInt(id)));

    const activeCardId = useSelector((state) => state.cards.activeCardId);
    const isActive = card.id === activeCardId; //kollar om kortet är aktivt eller inaktivt
    //const isActive = useSelector((state) => state.cards.activeCardId === parseInt(id));


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
        <label>
          Card Issuer:
          <select value={issuer} onChange={(e) => setIssuer(e.target.value)} disabled={isActive}>
            <option value="Mastercard">Mastercard</option>
            <option value="Visa">Visa</option>
            <option value="American Express">American Express</option>
          </select>
        </label>
        <label>
          Card Number:
          <input type="text" value={number} disabled={isActive} onChange={(e) => setNumber(e.target.value)} />
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
  
  export default Card
  
