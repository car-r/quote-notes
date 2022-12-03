import { Link } from "@remix-run/react";

export default function HeroSection() {
    return (
        <>
            <div className="flex flex-col w-full py-32 text-stone-200">
                <div className="flex flex-col lg:flex-row gap-4 mx-auto px-4 max-w-6xl">
                    <div className="">
                        <h1 className="text-5xl md:text-7xl font-bold max-w-xl mb-4">Remember everything you read.</h1>
                        <p className="text-xl md:text-2xl font-light max-w-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">
                            QuoteNotes will help you stay organized and make your book-reading experience even better.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/join">
                                <button className="flex tems-center gap-2 font-bold text-stone-800 border-2 border-blue-400 bg-blue-400 rounded-3xl px-4 py-2 hover:bg-transparent hover:text-white transition-all ease-in-out">
                                    <p>Get Started</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </Link>
                            <Link to="/join">
                                <button className="flex tems-center gap-2 font-bold text-stone-900 border-2 border-stone-200 bg-stone-200 rounded-3xl px-4 py-2 hover:bg-stone-50  hover:text-blue-600 transition-all ease-in-out">
                                    <p>Watch a Demo</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img
                            className="hidden lg:inline-block p-3 bg-stone-700/70 border border-stone-700 max-w-md rounded-lg skew-y-12 -skew-x-3 rotate-3" 
                            src="herosection-image-2.jpg" alt="display of the quotenotes application"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}