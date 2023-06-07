import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Routes, Route } from "react-router-dom";
import ChildInstallments from './component/ChildInstallments'
import { BrowserRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<App />} />
        <Route exact path="/childData/:id" element={<ChildInstallments />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

