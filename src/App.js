import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import Home from './components/Home';
import ReserveForm from './components/ReserveForm';
import DoctorsPage from './components/DoctorsPage/DoctorsPage';
import Reservations from './components/Reservations';
import DoctorDetail from './components/DoctorsPage/DoctorDetail';

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
