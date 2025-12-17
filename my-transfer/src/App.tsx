import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AddCountry from "./Pages/AddCountry";
import EditCountryPage from "./Pages/EditCountryPage";
import CitiesPage from "./Pages/CitiesPage";
import AddCities from "./Pages/AddCities";
import CityDescriptionPage from "./Pages/CityDescriptionPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import RegisterPage from "./Pages/RegisterPage";
import Admin from "./Pages/Admin";
import MainLayout from "./MainLayout.tsx";

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-country" element={<AddCountry />} />
                <Route path="/edit-country/:id" element={<EditCountryPage />} />
                <Route path="/cities" element={<CitiesPage />} />
                <Route path="/cities/:slug" element={<CityDescriptionPage />} />
                <Route path="/add-cities" element={<AddCities />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin-panel" element={<Admin />} />
            </Route>
        </Routes>
    );
}
export default App;