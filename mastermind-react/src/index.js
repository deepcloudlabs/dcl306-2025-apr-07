import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import MastermindProvider from "./provider/MastermindProvider";
import {BrowserRouter, Route, Routes} from "react-router";
import PlayerLoses from "./components/loses/loses";
import PlayerWins from "./components/wins/wins";

const routing =
    <Routes>
        <Route path="/" element={<MastermindProvider></MastermindProvider>} exact></Route>
        <Route path="/loses" element={<PlayerLoses></PlayerLoses>}></Route>
        <Route path="/wins" element={<PlayerWins></PlayerWins>}></Route>
    </Routes>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {routing}
    </BrowserRouter>
);
