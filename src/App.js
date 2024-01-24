
import './App.css';
import LoginPage from '../src/Pages/LoginPage';
import SignupPage from '../src/Pages/LoginPage';
import { Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/common.css';



function App() {

  const options1 = {
    chartId: 'chart1',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  };

  const chartData1 = [
    { name: 'Set 1', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] },
    { name: 'Set 2', data: [15, 25, 30, 45, 35, 55, 65, 80, 100] },
  ];

  const options2 = {
    chartId: 'chart2',
    categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  };

  const chartData2 = [
    { name: 'Set A', data: [23, 12, 54, 61, 32, 56, 81, 19, 73] },
    { name: 'Set B', data: [10, 30, 40, 50, 60, 70, 80, 90, 100] },
  ];

  return (

    <Routes>
      <Route path="/" element={<SignupPage />} />
      {/* <Route path="/signup" element={<SignupPage />} /> */}
    </Routes>

  );
} 

export default App;
