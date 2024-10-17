import { Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import Settings from './routes/Settings';
import Header from './components/Header/Header';
import AddCard from './routes/AddCard';
import Card from './routes/Card';
import './App.css';
import './index.css';

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addcard" element={<AddCard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/card/:id" element={<Card />} />
      </Routes>
    </>
  );
}

export default App;