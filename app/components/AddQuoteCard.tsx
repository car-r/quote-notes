import { Link } from "@remix-run/react";

export default function AddQuoteCard() {
    return (
        <Link to="/quotes/new" className="flex p-4 border border-stone-800 outline-dashed bg-stone-800 rounded-md text-stone-300/60 hover:text-stone-100 hover:outline-blue-400 justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p>ADD QUOTE <span className="text-2xl">+</span></p>
        </Link>
    )
}