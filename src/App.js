import './App.css';
import LoginPage from '../src/routes/LoginPage';
import SignupPage from '../src/routes/SignupPage';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
} 

export default App;
