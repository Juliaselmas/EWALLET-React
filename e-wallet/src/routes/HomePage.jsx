import { Link } from "react-router-dom"
import { useLocation, useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import { CardContainer } from '../features/CardContainer';


function HomePage() {

  //hämtar alla kort från redux state. cardSlice används
  const cards = useSelector((state) => state.cards.cards);
  
    return (
      <div>
      <h1>Home Page</h1>
      <CardContainer />

      {cards.length < 4 && (
        <Link to="/addcard"><button>Add New Card</button></Link>
      )}
    </div>
    )
  }
  
  export default HomePage
  