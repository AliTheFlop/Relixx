"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext({
    isLoggedIn: false,
    toggleLoggedIn: () => {},
});

export function ThemeProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function toggleLoggedIn() {
        setIsLoggedIn((prev) => !prev);
    }

    return (
        <ThemeContext.Provider value={{ isLoggedIn, toggleLoggedIn }}>
            {children}
        </ThemeContext.Provider>
    );
}
