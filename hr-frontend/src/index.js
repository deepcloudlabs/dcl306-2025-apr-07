import React from 'react';
import ReactDOM from 'react-dom/client';
import HrProvider from "./provider/hr-provider";
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HrProvider />
);