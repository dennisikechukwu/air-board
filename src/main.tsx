// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import FlightDetails from './components/FlightDetails';
import './index.css'; // Make sure Tailwind or your CSS is imported

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/flight/:flightNumber" element={<FlightDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
