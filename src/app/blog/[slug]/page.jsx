// app/blog/[slug]/page.jsx
import he from "he";
import client from "~/backend/db.js";

// Set up dompurify
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Server component - Get all SLUGS.
export async function generateStaticParams() {
    try {
        const result = await client.query("SELECT slug FROM blogs.blog");
        return result.rows.map((row) => ({
            slug: row.slug,
        }));
    } catch (error) {
        console.error("Failed to fetch slugs", error);
        return [];
    }
}

// Server component - Fetch data based on slug.
async function fetchBlogPost(slug) {
    try {
        const result = await client.query({
            text: "SELECT content FROM blogs.blog WHERE slug=$1",
            values: [slug],
        });

        if (!result.rows.length) return null;

        if (!result.rows[0].content) return null;

        const rawContent = result.rows[0].content;
        const decodedContent = he.decode(rawContent);
        return DOMPurify.sanitize(decodedContent);
    } catch (err) {
        console.error("Blog fetch error:", err);
        return null;
    }
}

// Now get blog based on slug
export default async function BlogPage({ params }) {
    const { slug } = await params;
    const content = await fetchBlogPost(slug);

    if (!content) {
        return <div>Blog post not found</div>;
    }

    return (
        <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

export async function generateMetadata({ params }) {
    const { slug } = await params;

    return {
        title: `Blog - ${slug}`,
        description: `Blog post about ${slug}`,
    };
}
