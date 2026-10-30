import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "./authService";

const AuthContext = createContext(null);

export function getUserRole(user) {
    if (!user) return "";

    const role = user.role ?? user.userRole;

    if (typeof role === "string") {
        return role.replace(/^ROLE_/, "").toUpperCase();
    }

    if (role && typeof role === "object" && role.name) {
        return String(role.name).replace(/^ROLE_/, "").toUpperCase();
    }

    const roles = user.roles ?? user.authorities ?? [];

    if (Array.isArray(roles)) {
        const adminRole = roles.find((item) => {
            const value = typeof item === "string" ? item : item?.authority ?? item?.name;
            return typeof value === "string" && value.replace(/^ROLE_/, "").toUpperCase() === "ADMIN";
        });

        if (adminRole) return "ADMIN";

        const firstRole = roles[0];
        const value = typeof firstRole === "string" ? firstRole : firstRole?.authority ?? firstRole?.name;

        if (typeof value === "string") {
            return value.replace(/^ROLE_/, "").toUpperCase();
        }
    }

    return "";
}

export function getUserDisplayName(user) {
    if (!user) return "";

    const firstName = user.firstName ?? user.first_name;
    const lastName = user.lastName ?? user.last_name;
    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

    return (
        fullName ||
        user.name ||
        user.username ||
        user.userName ||
        user.identifier ||
        user.email ||
        user.mobile ||
        user.phone ||
        "کاربر"
    );
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const clearSession = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
    };

    useEffect(() => {
        let active = true;

        const initializeAuth = async () => {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                if (active) setLoading(false);
                return;
            }

            try {
                const currentUser = await authService.getCurrentUser();

                if (active) {
                    setUser(currentUser);
                }
            } catch {
                if (active) {
                    clearSession();
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        initializeAuth();

        return () => {
            active = false;
        };
    }, []);

    const login = async (credentials) => {
        const tokens = await authService.login(credentials);

        const accessToken = tokens?.accessToken;
        const refreshToken = tokens?.refreshToken;

        if (!accessToken) {
            throw new Error("ACCESS_TOKEN_NOT_RECEIVED");
        }

        localStorage.setItem("accessToken", accessToken);

        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        } else {
            localStorage.removeItem("refreshToken");
        }

        try {
            const currentUser = await authService.getCurrentUser();

            if (!currentUser) {
                throw new Error("USER_INFORMATION_NOT_RECEIVED");
            }

            setUser(currentUser);
            return currentUser;
        } catch (error) {
            clearSession();
            throw error;
        }
    };

    const register = async (data) => {
        return authService.register(data);
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem("refreshToken");

        try {
            if (refreshToken) {
                await authService.logout(refreshToken);
            }
        } finally {
            clearSession();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                clearSession,
                isAdmin: getUserRole(user) === "ADMIN",
                displayName: getUserDisplayName(user)
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
