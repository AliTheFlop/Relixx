"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
        const formData = {
            email: e.target.email.value,
            pass: e.target.password.value,
        };

        await axios
            .post(
                "http://localhost:4000/login",
                { formData: formData },
                { withCredentials: true }
            )
            .then((result) => {
                if (result.data.token) {
                    router.push("/dashboard");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col justify-center items-center h-[80vh]">
            <div className="flex flex-col border rounded-lg px-5 py-10 w-[468px]">
                <div className="flex flex-col items-center mb-4">
                    <h2 className="font-serif text-2xl font-bold">
                        Login To Your Account
                    </h2>
                    <p className="text-md">Enter your details below</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
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
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}
