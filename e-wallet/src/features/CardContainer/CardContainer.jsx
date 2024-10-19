import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import CardDisplay from '../../components/CardDisplay/CardDisplay';
import { setActiveCard } from '../../redux/cardSlice';
import CardContainerCSS from './CardContainer.module.css';

export const CardContainer = () => {

const cards = useSelector((state) => state.cards.cards);
const activeCardId = useSelector((state) => state.cards.activeCardId);


return (
  <div className={CardContainerCSS.CardContainer}>
    {cards.length === 0 ? (
      <h1 className={CardContainerCSS.NoCardsMessage}>
        Add your first card to get started
      </h1>
    ) : (
      <>
        <div className={CardContainerCSS.ActiveCardContainer}>
          {cards
            .filter((card) => card.id === activeCardId)
            .map((card) => (
              <Link
                to={`/card/${card.id}`}
                key={card.id}
                style={{ textDecoration: 'none' }}
              >
                <div className={CardContainerCSS.ActiveCard}>
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

        <div className={CardContainerCSS.InActiveCardContainer}>
          <h2 className={CardContainerCSS.InActiveCardH2}>
            INACTIVE CARDS:
          </h2>
          {cards
            .filter((card) => card.id !== activeCardId)
            .map((card) => (
              <Link
                to={`/card/${card.id}`}
                key={card.id}
                style={{ textDecoration: 'none' }}
              >
                <div className={CardContainerCSS.InactiveCard}>
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
      </>
    )}
  </div>
);
};