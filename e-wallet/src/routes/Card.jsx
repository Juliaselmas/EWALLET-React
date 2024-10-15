import { Link } from "react-router-dom";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateCard, deleteCard, setActiveCard} from "../redux/cardSlice";


function Card() {
  
    const { id } = useParams(); //hämtar id från url
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const card = useSelector((state) =>
    state.cards.cards.find((card) => card.id === parseInt(id)));

    const activeCardId = useSelector((state) => state.cards.activeCardId);

    //lokala state för att hålla uppdaterade fält
    const [name, setName] = useState(card.name);
    const [number, setNumber ] = useState(card.number);
    const [owner, setOwner] = useState(card.owner);

    const isActive = card.id === activeCardId; //kollar om kortet är aktivt eller inaktivt

    const handleUpdate = () => {
        if (!isActive) {
            dispatch(updateCard({ id: card.id, name, number, owner}));
            navigate("/");
        }
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
    <div>
        <h1>Card Details</h1>
          <form>
            <label>
                Card Name:
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isActive} //låser input om kortet är aktivt
                />
            </label>
            <label>
                Card Number:
                <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                disabled={isActive} //låser input om kortet är aktivt
                />
            </label>
            <label>
                Owner Name:
                <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                disabled={isActive} //låser input om kortet är aktivt
                />
            </label>
            <button type="button" onClick={handleUpdate} disabled={isActive}>
            Update Card
            </button>
            <button type="button" onClick={handleActivate} disabled={isActive}>
            Activate Card
            </button>
            <button type="button" onClick={handleDelete} disabled={isActive}>
            Delete Card
            </button>
        </form>
    </div>
    )
  }
  
  export default Card
  
