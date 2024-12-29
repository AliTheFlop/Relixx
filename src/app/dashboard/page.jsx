import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import client from "~/backend/db";
import RecentBlogs from "@/components/RecentBlog";

async function getUserData(email) {
    try {
        const result = await client.query({
            text: "SELECT * FROM blogs.blog WHERE owner = $1",
            values: [email],
        });

        return result.rows;
    } catch (err) {
        console.log(err);
    }
}

export default async function Dashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    var userBlogs = null;

    try {
        const userData = jwt.verify(token, process.env.JWT_SECRET);
        userBlogs = await getUserData(userData.userId);
    } catch (err) {
        console.log(err);
    }

    return (
        <div className="flex flex-col px-32 py-10">
            <h1 className="font-bold text-3xl ">Your dashboard</h1>
            <h3 className="font-bold mt-3">Recent Blogs</h3>
            <RecentBlogs blogs={userBlogs} />
        </div>
    );
}
