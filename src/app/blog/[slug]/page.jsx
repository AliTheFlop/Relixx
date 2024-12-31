// app/blog/[slug]/page.jsx
import he from "he";
import client from "~/backend/db.js";
import Head from "next/head";

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
            text: "SELECT * FROM blogs.blog WHERE slug=$1",
            values: [slug],
        });

        if (!result.rows.length) return null;

        if (!result.rows[0].content) return null;

        const rawContent = result.rows[0].content;
        const decodedContent = he.decode(rawContent);
        const content = DOMPurify.sanitize(decodedContent);

        const blogData = {
            content: content,
            title: result.rows[0].title,
            description: result.rows[0].description,
            author: result.rows[0].author,
            published: result.rows[0].created_at,
        };

        return blogData;
    } catch (err) {
        console.error("Blog fetch error:", err);
        return null;
    }
}

export default async function BlogPage({ params }) {
    const { slug } = await params;
    const { content, title, description, author, published } =
        await fetchBlogPost(slug);

    if (!content) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-[#2C2B2B] text-xl font-serif">
                    Blog post not found
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white text-[#2C2B2B]">
            {/* Blog Header */}
            <header className="px-4 py-20 md:py-28 max-w-4xl mx-auto text-center">
                {" "}
                {/* Increased width and padding */}
                <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                    {" "}
                    {/* Larger title */}
                    {title}
                </h1>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>
                <div className="flex items-center justify-center space-x-4 text-base text-gray-600">
                    <span className="font-medium">{author}</span>
                    <span className="text-gray-400">•</span>
                    <time className="text-gray-600">
                        {new Date(published).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </div>
            </header>

            {/* Blog Content */}
            <article className="px-4 max-w-4xl mx-auto">
                {" "}
                {/* Increased width */}
                <div
                    className="prose prose-xl prose-stone mx-auto
                    prose-headings:font-serif
                    prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-12
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-[#8B3232] prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-12
                    prose-strong:text-[#2C2B2B]
                    prose-blockquote:border-l-[#8B3232] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6
                    prose-code:text-[#8B3232] prose-code:bg-gray-50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                    prose-ul:my-6 prose-li:my-2"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </article>

            {/* Footer CTA */}
            <footer className="mt-32 px-4 py-24 bg-[#E8DCC4]">
                {" "}
                {/* Increased padding */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">
                        Enjoyed this article?
                    </h2>
                    <p className="text-gray-700 text-xl mb-10">
                        Discover more thoughtful writing in our archive
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            className="bg-[#2C2B2B] text-white px-8 py-4 rounded-lg 
                            hover:bg-black transition-colors text-lg"
                        >
                            Explore Archive
                        </button>
                        <button
                            className="bg-white text-[#2C2B2B] px-8 py-4 rounded-lg 
                            hover:bg-gray-50 transition-colors text-lg border border-gray-200"
                        >
                            Share Article
                        </button>
                    </div>
                </div>
            </footer>
        </main>
    );
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const { title, description } = await fetchBlogPost(slug);

    return {
        title: `${title} | ScrollArchive`,
        description: `${description}`,
    };
}
