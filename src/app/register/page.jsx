"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
}

export default function Register() {
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            user: e.target.user.value,
            email: e.target.email.value,
            pass: e.target.password.value,
        };

        await axios
            .post("http://localhost:4000/register", { formData: formData })
            .then(() => {
                setRegisterSuccess(true);
                setSuccessMessage("Registration Successful! Redirecting...");
                timeout(1000);
                router.push("/login");
            })
            .catch((err) => {
                console.log(err);
                const message = err.response.data.message;
                if (err.status === 409) {
                    console.log(err);
                    setRegisterSuccess(false);
                    setSuccessMessage(message);
                } else {
                    setRegisterSuccess(false);
                    setSuccessMessage(
                        "Something went wrong. Please try again..."
                    );
                }
            });
    }

    return (
        <div className="flex flex-col justify-center items-center h-[80vh]">
            <div className="flex flex-col border rounded-lg px-5 py-10 w-[468px]">
                <div className="flex flex-col items-center mb-4">
                    <h2 className="font-serif text-2xl font-bold">
                        Create a free account
                    </h2>
                    <p className="text-md">To get started, sign up below</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label htmlFor="user" className="font-bold text-sm">
                        Username*
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Choose a username"
                        id="user"
                        className="border px-2 py-4 rounded-md mb-3 focus:outline-none"
                    />
                    <label htmlFor="email" className="font-bold text-sm">
                        Email*
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        id="email"
                        className="border px-2 py-4 rounded-md mb-3 focus:outline-none"
                    />
                    <label htmlFor="password" className="font-bold text-sm">
                        Password*
                    </label>
                    <input
                        type="password"
                        required
                        placeholder="Enter your password"
                        id="password"
                        className="border px-2 py-4 rounded-md mb-3 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-[#8B3232] text-white px-1 py-3 mt-2 rounded-md text-lg hover:bg-[#722828]"
                    >
                        Sign Up
                    </button>
                </form>
                {successMessage && (
                    <div
                        className={`${
                            !registerSuccess
                                ? "border border-[#8B3232] text-red-600 px-1 py-3 mt-2 rounded-md text-lg"
                                : "border border-green-500 text-green-500 px-1 py-3 mt-2 rounded-md text-lg"
                        }`}
                    >
                        <p className="text-center">{successMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
