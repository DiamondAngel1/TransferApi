import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AddCountry from "./Pages/AddCountry";
import "./index.css";
import EditCountryPage from "./Pages/EditCountryPage.tsx";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/add-country" element={<AddCountry />} />
                <Route path="/edit-country/:id" element={<EditCountryPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);