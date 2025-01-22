import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from "react-toastify"
import { GlobalProvider } from './components/Context/globalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <GlobalProvider>
    <App />
    </GlobalProvider>
  </React.StrictMode>
);

