export default function CreateBlogLayout({ children }) {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                {/* Optional: Navigation or breadcrumbs */}
            </header>

            <main className="prose prose-sm prose-slate max-w-none active:border-none bg-white rounded-xl shadow-sm p-6 sm:p-8">
                {children}
            </main>

            <footer className="mt-8">
                {/* Optional: Author info, related posts, etc. */}
            </footer>
        </div>
    );
}
