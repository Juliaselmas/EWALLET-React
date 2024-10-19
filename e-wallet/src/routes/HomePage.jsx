import { Link } from "react-router-dom"
import { useLocation, useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import { CardContainer } from '../features/CardContainer/CardContainer';


function HomePage() {
    return (
      <div className="HomePage">
       
      <CardContainer />

    </div>
    )
  }
  
  export default HomePage
  