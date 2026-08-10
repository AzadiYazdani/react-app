import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/HomeLayout.css";

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // <-- اضافه شد

import MainBody from "./sale/main/mainBody/MainBody";
import Header from "./sale/header/Header";
import Carousel from "./sale/banner/Carousel";
import Footer from "./sale/footer/Footer";

import useCities from "./hooks/useCities";
import useBusinessTypes from "./hooks/useBusinessTypes";
import useBusinessTypeModal from "./hooks/useBusinessTypeModal";
import useLocationModal from "./hooks/useLocationModal";

// صفحه ادمین (موقتاً یک کامپوننت ساده)
import AdminPage from "./admin/AdminPage"; // بعداً این فایل را می‌سازیم

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
