"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

async function Logout(router, setIsLoggedIn) {
    try {
        const response = await axios.post(
            "http://localhost:4000/logout",
            {},
            { withCredentials: true }
        );
        setIsLoggedIn(false);
        router.push("/");
    } catch (err) {
        console.error("Logout failed:", err.response?.data || err.message);
    }
}

export default function Navbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function fetchLoginState() {
        try {
            const response = await axios.get(
                "http://localhost:4000/auth/status",
                { withCredentials: true }
            );
            setIsLoggedIn(response.data.isLoggedIn);
        } catch (err) {
            console.error("Failed to fetch login state: ", err.message);
            setIsLoggedIn(false);
        }
    }

    useEffect(() => {
        fetchLoginState();
    }, []);

    useEffect(() => {
        if (searchParams.get("loggedIn") === "true") {
            fetchLoginState();
        }
    }, [searchParams]);

    return (
        <nav className="bg-[#FDFBF7]  text-[#2C2B2B] border-b-[1px] shadow-sm">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="font-serif text-xl text-[#2C2B2B]"
                        >
                            ScrollArchive
                        </Link>
                    </div>
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-8">
                            <Link
                                href="/dashboard"
                                className="text-[#2C2B2B] hover:text-[#8B3232] transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/createblog"
                                className="text-[#2C2B2B] hover:text-[#8B3232] transition-colors"
                            >
                                Create Blog
                            </Link>
                            <button
                                onClick={() => {
                                    Logout(router, setIsLoggedIn);
                                }}
                                className="text-[#2C2B2B] hover:text-[#8B3232] transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-[#2C2B2B] hover:text-[#8B3232] transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="text-[#2C2B2B] hover:text-[#8B3232] transition-colors"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
