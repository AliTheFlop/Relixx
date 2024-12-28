"use client";
import Link from "next/link";

export default function NavBar() {
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

                    <div className="flex items-center space-x-8">
                        <Link
                            href="/dashboard"
                            className="text-[#2C2B2B] hover:text-[#8B3232] transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/recent"
                            className="text-[#2C2B2B] hover:text-[#8B3232] transition-colors"
                        >
                            Recent Blogs
                        </Link>
                        <Link
                            href="/createblog"
                            className="text-[#2C2B2B] hover:text-[#8B3232] transition-colors"
                        >
                            Create Blog
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
