"use client";

import { useRouter } from "next/navigation";

export default function RecentBlogs({ blogs }) {
    const router = useRouter();

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-10">
            {blogs.map((blog) => (
                <div
                    key={blog.id}
                    className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/blog/${blog.slug}`)}
                >
                    <div className="p-6">
                        <h2
                            href={`/blog/${blog.slug}`}
                            className="text-xl font-semibold mb-3 text-[#2C2B2B] hover:text-[#8B3232] transition-colors "
                        >
                            {blog.title}
                        </h2>
                        <div className="overflow-hidden line-clamp-3 text-gray-600 text-sm">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: blog.content,
                                }}
                            ></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
