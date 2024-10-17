import { Link } from "react-router-dom"
import { useLocation, useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import { CardContainer } from '../features/CardContainer/CardContainer';


function HomePage() {

  //hämtar alla kort från redux state. cardSlice används
  const cards = useSelector((state) => state.cards.cards);
  
    return (
      <div className="HomePage">
      <CardContainer />

      {cards.length < 4 && (
        <Link to="/addcard"><button>Add New Card</button></Link>
      )}
    </div>
    )
  }
  
  export default HomePage
  