import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AddCountry from "./Pages/AddCountry";
import "./index.css";
import EditCountryPage from "./Pages/EditCountryPage.tsx";
import CitiesPage from "./Pages/CitiesPage.tsx";
import AddCities from "./Pages/AddCities.tsx";
import Header from "./Components/Header.tsx";
import CityDescriptionPage from "./Pages/CityDescriptionPage.tsx";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/add-country" element={<AddCountry />} />
                <Route path="/edit-country/:id" element={<EditCountryPage />} />
                <Route path="/cities" element={<CitiesPage/>}></Route>
                <Route path="/cities/:slug" element={<CityDescriptionPage />} />
                <Route path="/add-cities" element={<AddCities />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);