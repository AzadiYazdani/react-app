
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./LoginPage.css";

export default function RegisterPage() {
    const { user, register } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (user) {
        return <Navigate to={user.role === "ADMIN" ? "/admin" : "/"} replace />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("گذرواژه و تکرار آن یکسان نیستند.");
            return;
        }

        setSubmitting(true);

        try {
            await register({
                identifierType: "USERNAME",
                identifier: username.trim(),
                password
            });

            navigate("/login", {
                replace: true,
                state: { registrationSuccess: true }
            });
        } catch (error) {
            setError(
                error.response?.data?.localizedMessage ||
                error.response?.data?.message ||
                "ثبت‌نام ناموفق بود. لطفاً اطلاعات واردشده را بررسی کنید."
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
                    <h1>ایجاد حساب کاربری</h1>
                    <p>برای عضویت در حراجی، اطلاعات زیر را وارد کنید.</p>
                </div>

                {error && (
                    <div className="auth-error" role="alert">
                        <i className="bi bi-exclamation-circle"></i>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="username">نام کاربری</label>
                        <div className="auth-input-wrap">
                            <i className="bi bi-person auth-field-icon"></i>
                            <input
                                id="username"
                                className="auth-input"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="نام کاربری دلخواه خود را وارد کنید"
                                autoComplete="username"
                                required
                                minLength={3}
                                maxLength={50}
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
                                autoComplete="new-password"
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

                    <div className="auth-field">
                        <label htmlFor="confirmPassword">تکرار گذرواژه</label>
                        <div className="auth-input-wrap">
                            <i className="bi bi-shield-lock auth-field-icon"></i>
                            <input
                                id="confirmPassword"
                                className="auth-input"
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                placeholder="گذرواژه را دوباره وارد کنید"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-submit" disabled={submitting}>
                        {submitting ? (
                            <>
                                <span className="auth-spinner"></span>
                                در حال ثبت‌نام...
                            </>
                        ) : (
                            "ایجاد حساب کاربری"
                        )}
                    </button>
                </form>

                <div className="auth-register">
                    <span>قبلاً ثبت‌نام کرده‌اید؟</span>
                    <Link to="/login">وارد شوید</Link>
                </div>

                <div className="auth-terms">
                    ثبت‌نام شما به معنای پذیرش
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
