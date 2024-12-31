export default function BlogLayout({ children }) {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <main className="prose prose-xl prose-stone max-w-none">
                    <div
                        className="bg-white rounded-xl shadow-md p-8 sm:p-12
                        border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                        {children}
                    </div>
                </main>
                <footer className="mt-16 border-t border-gray-200/50 pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-6">
                            <button className="text-[#8B3232] hover:text-[#722828] transition-colors flex items-center gap-2">
                                <span>Share</span>
                            </button>
                            <span className="text-gray-300">•</span>
                            <button className="text-[#8B3232] hover:text-[#722828] transition-colors flex items-center gap-2">
                                <span>Bookmark</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                                Next Article
                            </span>
                            <button
                                className="bg-[#2C2B2B] text-white px-6 py-2 rounded-lg 
                                hover:bg-black transition-colors text-sm"
                            >
                                Continue Reading
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
