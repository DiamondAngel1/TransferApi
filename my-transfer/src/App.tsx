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
import MainLayout from "./MainLayout.tsx";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./Pages/ResetPasswordPage.tsx";
import Dashboard from "./admin/Pages/Dashboard/Dashboard.tsx";
import AppLayout from "./admin/Layout/AppLayout.tsx";
import AllUsersFilterPage from "./Pages/AllUsersFilterPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/cities" element={<CitiesPage />} />
                <Route path="/cities/:slug" element={<CityDescriptionPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

            </Route>
            <Route path="/admin-panel" element={<AppLayout/>}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-country" element={<AddCountry />} />
                <Route path="cities" element={<CitiesPage />} />
                <Route path="countries" element={<HomePage />} />
                <Route path="add-city" element={<AddCities />} />
                <Route path="cities/:slug" element={<CityDescriptionPage />} />
                <Route path="edit-country/:id" element={<EditCountryPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="all-users" element={<AllUsersFilterPage/>} />
            </Route>
        </Routes>
    );
}
export default App;