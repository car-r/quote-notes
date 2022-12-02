import { Link } from "@remix-run/react";
import PrimaryActionBtn from "../Buttons/PrimaryActionBtn";

export default function HeroSection() {
    return (
        <>
            <div className="flex flex-col w-full py-20 text-stone-200">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-7xl font-bold max-w-xl mb-4">Remember everything you read.</h1>
                    <Link to="/join">
                        <button className="flex items-center gap-2 font-bold text-stone-800 border-2 border-blue-400 bg-blue-400 rounded-3xl px-4 py-2 hover:bg-transparent hover:text-white transition-all ease-in-out">
                            <p>Get Started</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}