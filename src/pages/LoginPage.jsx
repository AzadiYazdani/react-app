import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUserRole, useAuth } from "../auth/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
    const { user, loading, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (loading) {
        return (
            <main className="auth-page" dir="rtl" aria-live="polite">
                در حال بررسی وضعیت حساب کاربری...
            </main>
        );
    }

    if (user) {
        return (
            <Navigate
                to={getUserRole(user) === "ADMIN" ? "/admin" : "/"}
                replace
            />
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const currentUser = await login({
                identifierType: "USERNAME",
                identifier: identifier.trim(),
                password
            });

            const requestedPath = location.state?.from?.pathname;
            const isAdmin = getUserRole(currentUser) === "ADMIN";

            const destination = isAdmin
                ? requestedPath && requestedPath !== "/login" ? requestedPath : "/admin"
                : "/";

            navigate(destination, { replace: true });
                } catch (error) {
                    setError(
                        error.response?.data?.localizedMessage ||
                        error.response?.data?.message ||
                        "ورود ناموفق بود. اطلاعات ورود را بررسی کنید."
                    );
                } finally {
                    setSubmitting(false);
                }
    };

    return (
        <main className="auth-page" dir="rtl">
            <Link to="/" className="auth-back-link">
                <i className="bi bi-arrow-right"></i>
                بازگشت به صفحه اصلی
            </Link>

            <section className="auth-card">
                <Link to="/" className="auth-brand" aria-label="صفحه اصلی">
                    <span className="auth-brand-icon">
                        <i className="bi bi-bag-heart-fill"></i>
                    </span>
                    <span className="auth-brand-name">حراجی</span>
                </Link>

                <div className="auth-heading">
                    <h1>ورود به حساب کاربری</h1>
                    <p>برای ادامه، اطلاعات حساب خود را وارد کنید.</p>
                </div>

                {error && (
                    <div className="auth-error" role="alert">
                        <i className="bi bi-exclamation-circle"></i>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="identifier">نام کاربری</label>
                        <div className="auth-input-wrap">
                            <i className="bi bi-person auth-field-icon"></i>
                            <input
                                id="identifier"
                                className="auth-input"
                                type="text"
                                value={identifier}
                                onChange={(event) => setIdentifier(event.target.value)}
                                placeholder="نام کاربری خود را وارد کنید"
                                autoComplete="username"
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">گذرواژه</label>
                        <div className="auth-input-wrap">
                            <i className="bi bi-lock auth-field-icon"></i>
                            <input
                                id="password"
                                className="auth-input auth-password-input"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="گذرواژه خود را وارد کنید"
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "مخفی کردن گذرواژه" : "نمایش گذرواژه"}
                            >
                                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="auth-submit" disabled={submitting}>
                        {submitting ? (
                            <>
                                <span className="auth-spinner"></span>
                                در حال ورود...
                            </>
                        ) : (
                            "ورود به حساب کاربری"
                        )}
                    </button>
                </form>

                <div className="auth-register">
                    <span>هنوز حساب کاربری ندارید؟</span>
                    <Link to="/register">ثبت‌نام کنید</Link>
                </div>

                <div className="auth-terms">
                    ورود شما به معنای پذیرش
                    <span> شرایط استفاده </span>
                    و
                    <span> حریم خصوصی </span>
                    سامانه است.
                </div>
            </section>

            <footer className="auth-footer">
                تجربه‌ای ساده‌تر برای پیدا کردن حراجی‌های بهتر
            </footer>
        </main>
    );
}
