
import "../../../css/App.css";
import "./Header.css";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import SearchBar from "./searchBar/SearchBar";
import Cart from "./cart/Cart";
import LocationSelectButton from "./location/LocationSelectButton";
import LocationModal from "./location/LocationModal";
import BusinessTypeSelectButton from "./businessType/BusinessTypeSelectButton";
import BusinessTypeModal from "./businessType/BusinessTypeModal";
import ImagesPage from "./logo/ImagesPage";
import { useAuth } from "../../../auth/AuthContext";

export default function Header({
    city,
    locationModal,
    businessType,
    businessTypeModal
}) {
    const { user, loading, logout, isAdmin, displayName } = useAuth();
    const navigate = useNavigate();

    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                accountMenuRef.current &&
                !accountMenuRef.current.contains(event.target)
            ) {
                setAccountMenuOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setAccountMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleLogout = async () => {
        setAccountMenuOpen(false);

        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            navigate("/", { replace: true });
        }
    };

    const accountName = displayName || user?.username || user?.email || "حساب کاربری";

    const closeAccountMenu = () => {
        setAccountMenuOpen(false);
    };

    return (
        <header className="site-header">
            <Container fluid className="header-top">
                <div className="header-logo-wrapper">
                    <ImagesPage />
                </div>

                <div className="header-search-wrapper">
                    <SearchBar />
                </div>

                <div className="header-actions">
                    {!loading && user && (
                        <>
                            {isAdmin && (
                                <>
                                    <Link to="/admin" className="header-action-button admin-link">
                                        <i className="bi bi-gear" aria-hidden="true"></i>
                                        <span>مدیریت</span>
                                    </Link>
                                    <div className="header-divider"></div>
                                </>
                            )}

                            <div className="account-menu-wrapper" ref={accountMenuRef}>
                                <button
                                    type="button"
                                    className="account-menu-trigger"
                                    onClick={() => setAccountMenuOpen((prev) => !prev)}
                                    aria-label="نمایش منوی کاربر"
                                    aria-expanded={accountMenuOpen}
                                    aria-haspopup="true"
                                >
                                    <i className="bi bi-person-circle" aria-hidden="true"></i>
                                </button>

                                {accountMenuOpen && (
                                    <div className="account-dropdown" role="menu">
                                        <Link
                                            to="/profile"
                                            className="account-dropdown-user"
                                            role="menuitem"
                                            onClick={closeAccountMenu}
                                        >
                                            <i className="bi bi-person-circle" aria-hidden="true"></i>
                                            <span>
                                                <strong>{accountName}</strong>
                                            </span>
                                            <i className="bi bi-chevron-left account-dropdown-arrow" aria-hidden="true"></i>
                                        </Link>

                                        <div className="account-dropdown-divider"></div>

                                        <Link
                                            to="/favorites"
                                            className="account-dropdown-item"
                                            role="menuitem"
                                            onClick={closeAccountMenu}
                                        >
                                            <i className="bi bi-heart" aria-hidden="true"></i>
                                            <span>علاقه‌مندی‌های من</span>
                                        </Link>

                                        <Link
                                            to="/my-ads"
                                            className="account-dropdown-item"
                                            role="menuitem"
                                            onClick={closeAccountMenu}
                                        >
                                            <i className="bi bi-file-earmark-text" aria-hidden="true"></i>
                                            <span>آگهی‌های من</span>
                                        </Link>

                                        <div className="account-dropdown-divider"></div>

                                        <button
                                            type="button"
                                            className="account-dropdown-item account-logout"
                                            role="menuitem"
                                            onClick={handleLogout}
                                        >
                                            <i className="bi bi-box-arrow-left" aria-hidden="true"></i>
                                            <span>خروج از حساب کاربری</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="header-divider"></div>
                        </>
                    )}

                    {!loading && !user && (
                        <Link to="/login" className="header-action-button">
                            <i className="bi bi-person" aria-hidden="true"></i>
                            <span>ورود / ثبت‌نام</span>
                        </Link>
                    )}

                    {loading && (
                        <span className="header-action-button" aria-live="polite">
                            در حال بررسی حساب کاربری...
                        </span>
                    )}

                    <div className="header-divider"></div>

                    <button
                        type="button"
                        className="header-cart-button"
                        aria-label="سبد خرید"
                    >
                        <Cart number="2" />
                    </button>
                </div>
            </Container>

            <div className="header-navigation">
                <Container fluid>
                    <div className="header-navigation-inner">
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

                        <nav className="header-links" aria-label="دسته‌بندی حراج‌ها">
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
