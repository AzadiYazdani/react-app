
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/HomeLayout.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainBody from "./sale/main/mainBody/MainBody";
import Header from "./components/layouts/header/Header";
import Carousel from "./components/home/Carousel";
import Footer from "./components/layouts/Footer";

import useCities from "./hooks/useCities";
import useBusinessTypes from "./hooks/useBusinessTypes";
import useBusinessTypeModal from "./hooks/useBusinessTypeModal";
import useLocationModal from "./hooks/useLocationModal";

import AdminPage from "./admin/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminRoute from "./auth/AdminRoute";
import UserProfilePage from "./pages/UserProfilePage";

function HomePage() {
    const city = useCities();
    const businessType = useBusinessTypes();

    const businessTypeModal = useBusinessTypeModal(
        businessType.beginBusinessTypeSelection,
        businessType.cancelBusinessTypeSelection,
        businessType.confirmBusinessTypeSelection
    );

    const locationModal = useLocationModal(
        city.loadProvinces,
        city.beginSelection
    );

    return (
        <>
            <Header
                city={city}
                locationModal={locationModal}
                businessType={businessType}
                businessTypeModal={businessTypeModal}
            />
            <Carousel />
            <MainBody city={city} businessType={businessType} />
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
