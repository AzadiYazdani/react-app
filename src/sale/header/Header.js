import "../../css/App.css";
import React from "react";
import { Link } from "react-router-dom"; // <-- اضافه شد

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import SearchBar from "./searchBar/SearchBar";
import Cart from "./cart/Cart";

import LocationSelectButton from "./location/LocationSelectButton";
import LocationModal from "./location/LocationModal";

import BusinessTypeSelectButton from "./businessType/BusinessTypeSelectButton";
import BusinessTypeModal from "./businessType/BusinessTypeModal";

import ImagesPage from "./logo/ImagesPage";

export default function Header({
    city,
    locationModal,
    businessType,
    businessTypeModal
}) {

    return (
        <header className="site-header">

            {/* ردیف اول */}
            <Container fluid className="header-top">

                {/* لوگو */}
                <div className="header-logo-wrapper">
                    <ImagesPage />
                </div>

                {/* جستجو */}
                <div className="header-search-wrapper">
                    <SearchBar />
                </div>

                {/* امکانات سمت چپ */}
                <div className="header-actions">

                    {/* دکمه ورود به ادمین (اضافه شد) */}
                    <Link to="/admin" className="header-action-button admin-link">
                        <i className="bi bi-gear"></i>
                        <span>مدیریت</span>
                    </Link>

                    <div className="header-divider"></div>

                    <button className="header-action-button">
                        <i className="bi bi-person"></i>
                        <span>ورود / ثبت‌نام</span>
                    </button>

                    <div className="header-divider"></div>

                    <button className="header-cart-button">
                        <Cart number="2"/>
                    </button>

                </div>

            </Container>

            {/* ردیف دوم */}
            <div className="header-navigation">

                <Container fluid>

                    <div className="header-navigation-inner">

                        {/* شهر */}
                        <div className="header-filter">
                            <LocationSelectButton
                                onClick={locationModal.handleProvincesShow}
                                numberOfCities={city.numberOfCities}
                            />
                            <LocationModal
                                city={city}
                                locationModal={locationModal}
                            />
                        </div>

                        {/* نوع کسب‌وکار */}
                        <div className="header-filter">
                            <BusinessTypeSelectButton
                                onClick={businessTypeModal.handleBusinessTypeModalShow}
                                numberOfBusinessTypes={businessType.numberOfBusinessTypes}
                            />
                            <BusinessTypeModal
                                businessType={businessType}
                                businessTypeModal={businessTypeModal}
                            />
                        </div>

                        <div className="header-nav-divider"></div>

                        {/* لینک‌ها */}
                        <nav className="header-links">
                            <a href="#latest">جدیدترین حراج‌ها</a>
                            <a href="#discount">بیشترین تخفیف</a>
                            <a href="#popular">محبوب‌ترین‌ها</a>
                            <a href="#nearby">حراجی‌های نزدیک من</a>
                        </nav>

                    </div>

                </Container>

            </div>

        </header>
    );
}
