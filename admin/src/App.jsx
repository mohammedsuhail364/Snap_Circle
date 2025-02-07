import { BrowserRouter as  Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from "./Pages/Login"
import AllPhotographers from './Pages/Allphotographers';
import Appointment from './Pages/Appointment';


const App = () => {
  return (
    <div className="bg-gradient-to-b from-sky-100 to-orange-200 min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/allphotographer" element={<AllPhotographers/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
      </Routes>
    </div>
  )
}
export default App