import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/Register';
import LoginForm from './pages/Login';
import Home from './pages/Home';
import ReserveForm from './pages/reservations/ReserveForm';
import DoctorsPage from './pages/DoctorsPage/DoctorsPage';
import Reservations from './components/Reservations';
import DoctorDetail from './pages/DoctorsPage/DoctorDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reserve" element={(<ReserveForm />)} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
