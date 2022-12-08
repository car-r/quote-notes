import { Link } from "@remix-run/react";

export default function HeroSection() {
    return (
        <>
            <div className="flex flex-col w-full py-32 text-stone-100">
                <div className="flex flex-col lg:flex-row gap-10 mx-auto px-6 max-w-6xl">
                    <div className="">
                        <h1 className="text-5xl md:text-7xl font-bold max-w-xl mb-4">Remember everything you read.</h1>
                        <p className="text-xl md:text-2xl font-light max-w-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">
                            QuoteNotes will help you stay organized and make your book-reading experience even better.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/join">
                                <button className="flex items-center gap-2 font-bold text-sm md:text-base text-stone-800 border-2 border-blue-400 bg-blue-400 rounded-3xl px-4 py-2 hover:bg-transparent hover:text-white transition-all ease-in-out">
                                    <p>Get Started</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden sm:inline-block w-5 h-5 md:w-6 md:h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </Link>
                            <Link to="/join">
                                <button className="flex items-center gap-2 font-bold text-sm md:text-base text-stone-200 border-2 border-stone-200 bg-stone-900 rounded-3xl px-4 py-2 hover:bg-stone-50  hover:text-blue-600 transition-all ease-in-out">
                                    <p>Watch a Demo</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden sm:inline-block w-5 h-5 md:w-6 md:h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col mx-auto items-center">
                        <img
                            className="hidden lg:inline-block p-3 bg-stone-700/70 border border-stone-700 max-w-md rounded-lg skew-y-12 rotate-2" 
                            src="herosection-image.jpg" alt="display of the quotenotes application"
                        />
                        <div className="hidden lg:inline-block bg-stone-700/70 mt-1 w-32 h-10 skew-y-12 rotate-2 rounded"></div>
                        <div className="hidden lg:inline-block bg-stone-700/70 mt-1 w-48 h-2 skew-y-12 rotate-2 rounded"></div>
                    </div>
                    <div className="flex flex-col mx-auto items-center mt-10">
                        <img
                            className="lg:hidden p-3 rounded-2xl bg-stone-700/70 border border-stone-700 max-w-md skew-y-12 rotate-2 max-h-96 md:max-h-[32rem]" 
                            src="herosection-mobile-image.jpg" alt="display of the quotenotes application"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}