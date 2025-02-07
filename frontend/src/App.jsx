import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import Photographer from './pages/Photographer'; // Corrected typo
import Contact from './pages/Contact';
import About from './pages/About';
import Community from './pages/Community';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { assets } from './assets/assests';
import Booking from './pages/Booking';
import Camera from "./pages/Camera"
import Portfolio from './pages/Portfolio';
import Mybookings from './pages/Mybookings';
import { useContext, useEffect } from 'react';
import { Appcontext } from './context/Appcontext';

const App = () => {
  const {token}=useContext(Appcontext);
  const navigate=useNavigate();
  useEffect(()=>{
    if (!token){
      navigate('/login')
    }
  },[token])
  return (
    <div className="bg-gradient-to-b from-sky-100 to-orange-200 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/photographer/:id" element={<Photographer photographer={assets.photographers} />} /> {/* Corrected Route */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/community" element={<Community />} />
        <Route path="/photographers" element={<Camera/>}/>
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path="/mybookings" element={<Mybookings/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
