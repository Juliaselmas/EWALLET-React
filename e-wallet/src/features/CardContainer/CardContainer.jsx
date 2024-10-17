import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import CardDisplay from '../../components/CardDisplay/CardDisplay';
import { setActiveCard } from '../../redux/cardSlice';

export const CardContainer = () => {

const cards = useSelector((state) => state.cards.cards);
const activeCardId = useSelector((state) => state.cards.activeCardId);


    return (
      <div className='CardContainer'>
        <h2>Active Card</h2>
        {cards.filter(card => card.id === activeCardId).map(card => (
        <Link to={`/card/${card.id}`} key={card.id} style={{ textDecoration: 'none' }}>
        <div>
          <CardDisplay 
            issuer={card.issuer} 
            number={card.number} 
            owner={card.owner} 
            expire={card.expire}
            ccv="***" 
            ccvHidden={true} 
          />
        </div>
      </Link>
      ))}

        <h2>Inactive Cards</h2>
        {cards.filter(card => card.id !== activeCardId).map(card => (
        <Link to={`/card/${card.id}`} key={card.id} style={{ textDecoration: 'none' }}>
        <div>
          <CardDisplay 
            issuer={card.issuer} 
            number={card.number} 
            owner={card.owner} 
            expire={card.expire}
            ccv="***" 
            ccvHidden={true} 
          />
        </div>
      </Link>
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