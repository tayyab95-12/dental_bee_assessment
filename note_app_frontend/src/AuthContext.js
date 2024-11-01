// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    const login = () => {
        console.log("logging in")
        setLoading(true);
        // Simulate async login action
        setTimeout(() => {
            setIsAuthenticated(true);
            setLoading(false);
        }, 1000000);
    };

    const logout = () => {

        setLoading(true);
        // Simulate async logout action
        setTimeout(() => {
            setIsAuthenticated(false);
            setLoading(false);
        }, 1000000);
    };

    console.log("isAuthenticated", isAuthenticated);
    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};