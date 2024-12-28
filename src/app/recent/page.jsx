import client from "~/backend/db";
import RecentBlogs from "@/components/RecentBlog";

export const revalidate = 60;

async function getRecentBlogs() {
    try {
        const result = await client.query(
            "SELECT * FROM blogs.blog ORDER BY created_at DESC"
        );
        return result.rows;
    } catch (error) {
        console.error("Failed to fetch blogs", error);
        return [];
    }
}

export default async function AllBlogs() {
    const blogs = await getRecentBlogs();

    if (!blogs) {
        return <div>Loading blogs..</div>;
    }

    return (
        <div className="max-w-6xl flex flex-col items-center justify-center mx-auto px-4 py-8 ">
            <h1 className="text-3xl font-serif mb-8 text-[#2C2B2B]">
                Recent Posts
            </h1>
            <RecentBlogs blogs={blogs} />
        </div>
    );
}
