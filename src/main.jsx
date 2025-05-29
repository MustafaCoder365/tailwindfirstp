// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./styles/index.css";
// import App from "./App.jsx";


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';  // استيراد Tailwind/base.css
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
