import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import MastermindProvider from "./provider/MastermindProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MastermindProvider></MastermindProvider>
);
