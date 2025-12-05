import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import AddCountry from "./Pages/AddCountry";
import "./index.css";
import EditCountryPage from "./Pages/EditCountryPage.tsx";
import CitiesPage from "./Pages/CitiesPage.tsx";
import AddCities from "./Pages/AddCities.tsx";
import Header from "./Components/Header.tsx";
import CityDescriptionPage from "./Pages/CityDescriptionPage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import ProfilePage from "./Pages/ProfilePage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import { Provider } from "react-redux";
import {store} from "./app/store.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/add-country" element={<AddCountry />} />
                <Route path="/edit-country/:id" element={<EditCountryPage />} />
                <Route path="/cities" element={<CitiesPage/>}></Route>
                <Route path="/cities/:slug" element={<CityDescriptionPage />} />
                <Route path="/add-cities" element={<AddCities />} />
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
            </Routes>
        </BrowserRouter>
        </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);