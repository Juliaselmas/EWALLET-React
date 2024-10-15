import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveCard } from '../redux/cardSlice';

export const CardContainer = () => {
const dispatch = useDispatch(); //Rensa detta?
const { cards, activeCardId } = useSelector((state) => state.cards);

//hämtar det aktiva kortet
let activeCard = cards.find(card => card.id === activeCardId);
//hämtar de inaktiva korten
let inactiveCards = cards.filter(card => card.id !== activeCardId);

    return (
      <div>
        <h2>Active Card</h2>
        {activeCard && (
          <div className="Card">
          <h2>{activeCard.name}</h2>
          <h3>{activeCard.number}</h3>
          <p>Name: {activeCard.owner}</p>
          <Link to={`/card/${activeCard.id}`}>View Details</Link>
          </div>
        )}

        <h2>Inactive Cards</h2>
        {inactiveCards.map((card) => (
          <div key={card.id} className="Card">
            <h2>{card.name}</h2>
            <h3>{card.number}</h3>
            <p>Name: {card.owner}</p>
            <Link to={`/card/${card.id}`}>View Details</Link>
          </div>
        ))}
        
        </div>
    );
  };

  /*
  funktionalitet för att snabbt kunna göra ett kort aktivt:
  <div key={card.id} className="Card" onClick={() => dispatch(setActiveCard(card.id))}>
            <h2>{card.name}</h2>
            <h3>{card.number}</h3>
            <p>Name: {card.owner}</p>
          </div>
  */