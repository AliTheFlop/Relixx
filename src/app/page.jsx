export default async function Home() {
    return (
        <>
            <main className="min-h-screen bg-[#FDFBF7] text-[#2C2B2B]">
                {/* Hero Section */}
                <section className="px-4 py-32 md:px-8 lg:px-16 max-w-7xl mx-auto">
                    {/* Main Headline */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
                            Unfold your story
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 mb-8">
                            Where timeless thoughts find their place in the
                            digital age
                        </p>
                        <button
                            className="bg-[#8B3232] text-white px-8 py-4 rounded-lg 
              hover:bg-[#722828] transition-colors text-lg"
                        >
                            Start Writing
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-12 mt-24">
                        <div className="text-center">
                            <div className="text-4xl mb-4">📜</div>
                            <h3 className="font-serif text-xl mb-2">
                                Preserve
                            </h3>
                            <p className="text-gray-600">
                                Your words, carefully archived for posterity
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">🗃️</div>
                            <h3 className="font-serif text-xl mb-2">Curate</h3>
                            <p className="text-gray-600">
                                Organize your thoughts into elegant collections
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="font-serif text-xl mb-2">Share</h3>
                            <p className="text-gray-600">
                                Let your ideas resonate through time
                            </p>
                        </div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="bg-[#2C2B2B] text-white py-24 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="font-serif text-3xl md:text-4xl mb-12">
                            Join thousands of modern scribes
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-[#363636] p-8 rounded-lg">
                                <p className="mb-4">
                                    "The most elegant writing platform I've ever
                                    used."
                                </p>
                                <p className="text-[#E8DCC4]">— Alexandra K.</p>
                            </div>
                            <div className="bg-[#363636] p-8 rounded-lg">
                                <p className="mb-4">
                                    "Finally, a place where my words feel at
                                    home."
                                </p>
                                <p className="text-[#E8DCC4]">— Marcus T.</p>
                            </div>
                            <div className="bg-[#363636] p-8 rounded-lg">
                                <p className="mb-4">
                                    "Beautiful, minimal, and incredibly
                                    powerful."
                                </p>
                                <p className="text-[#E8DCC4]">— Sarah M.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 py-32 text-center bg-[#E8DCC4]">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-serif text-3xl md:text-4xl mb-6">
                            Begin your archival journey
                        </h2>
                        <p className="text-xl mb-8">
                            Join ScrollArchive today and give your words the
                            home they deserve.
                        </p>
                        <button
                            className="bg-[#2C2B2B] text-white px-8 py-4 rounded-lg 
              hover:bg-black transition-colors text-lg"
                        >
                            Create Your Archive
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
