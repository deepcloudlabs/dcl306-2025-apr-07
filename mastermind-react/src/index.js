import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import Mastermind from './Mastermind';
import {BrowserRouter, Route, Routes} from "react-router";
import PlayerWins from "./components/wins/wins";
import PlayerLoses from "./components/loses/loses";
const routing=
    <Routes>
        <Route path="/" element={<Mastermind />} exact={true} />
        <Route path="/wins" element={<PlayerWins />} exact={true} />
        <Route path="/loses" element={<PlayerLoses />} exact={true} />
    </Routes>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {routing}
    </BrowserRouter>
);
