import { Link } from "@remix-run/react";

export default function Pricing() {
    return (
        <>
            <div className="flex w-full py-36">
                <div className="px-4 mx-auto max-w-7xl">
                    <h2 className="text-4xl text-stone-200 font-thin text-center pb-10">Pricing Plans</h2>
                    <div className="grid grid-cols 1 gap-10 md:grid-cols-3">
                        <div className="flex flex-col gap-8 p-6 border border-stone-700 rounded-xl max-w-md">
                            <h4 className="text-xl font-semibold text-blue-400">Free</h4>
                            <p className="text-5xl font-bold text-stone-50">$0<span className="ml-1 font-semibold text-2xl text-stone-500">/month</span></p>
                            <p className="text-stone-500">Free forever. Keep 5 books in your library with the free plan. Upgrade at any time.</p>
                            <div className="">
                                <ul className="flex flex-col gap-4">
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-400">Keep up to 5 books in your library</p>
                                    </li>
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-400">Store 50 total quotes</p>
                                    </li>
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-400">Save up to 100 notes</p>
                                    </li>
                                </ul>
                            </div>
                            <Link to="/join" className="mt-auto border border-stone-200 bg-transparent text-stone-200 w-full rounded flex flex-col py-2 transition-all ease-in-out hover:bg-blue-600">
                                <button className="font-bold">Join Now</button>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-8 p-6  md:scale-105 border border-stone-700 rounded-xl max-w-md bg-white">
                            <h4 className="text-xl font-semibold text-blue-400">Pro</h4>
                            <p className="text-5xl font-bold text-stone-900">$5<span className="ml-1 font-semibold text-2xl text-stone-900">/month</span></p>
                            <p className="text-stone-800">For the never ending learner. Keep 20 books in your library with 200 quotes for each book.</p>
                            <div className="">
                                <ul className="flex flex-col gap-4">
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-800">Keep up to 20 books in your library</p>
                                    </li>
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-800">Store 200 total quotes</p>
                                    </li>
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-800">Save up to 400 notes</p>
                                    </li>
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-800 text">Export your quotes and notes</p>
                                    </li>
                                </ul>
                            </div>
                            
                            <Link to="/join" className="mt-auto bg-blue-400 text-stone-900 w-full rounded flex flex-col py-2 transition-all ease-in-out hover:bg-blue-600 hover:text-white">
                                <button className="font-bold">Join Now</button>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-8 p-6 border border-stone-700 rounded-xl max-w-md">
                            <h4 className="text-xl font-semibold text-blue-400">Elite</h4>
                            <p className="text-5xl font-bold text-stone-50">$9<span className="ml-1 font-semibold text-2xl text-stone-500">/month</span></p>
                            <p className="text-stone-500">For the ultimate bookworm. Keep unlimited books in your library with unlimited quotes.</p>
                            <div className="">
                                <ul className="flex flex-col gap-4">
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-400">Unlimited books in your library</p>
                                    </li>
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-400">Unlimited quotes</p>
                                    </li>
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-400">Unlimited notes</p>
                                    </li>
                                    <li className="flex gap-10 items-center text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <p className="text-stone-400">Export your library and all of your notes</p>
                                    </li>
                                </ul>
                            </div>
                            
                            <Link to="/join" className="mt-auto border border-stone-200 bg-transparent text-stone-200 w-full rounded flex flex-col py-2 transition-all ease-in-out hover:bg-blue-600">
                                <button className="font-bold">Join Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}