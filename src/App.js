import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Home from './components/home/homePage';
import Play from './components/playVideo/play';
import Navbar from './components/navbar/navbar';
function App() {
  return (
  
  <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/play/:id" element={<Play />} />
          </Routes>
    
  </>
  );
}

export default App;
