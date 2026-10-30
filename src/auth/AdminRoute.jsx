
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminRoute() {
    const { user, loading } = useAuth();

    if (loading) return <p>در حال بررسی دسترسی...</p>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
