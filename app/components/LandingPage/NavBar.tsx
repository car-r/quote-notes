import { Link, NavLink } from "@remix-run/react";

export default function NavBar() {
    return (
        <>
            <nav className="flex items-center text-stone-200 py-6 justify-between w-full px-4 mx-auto max-w-5xl">
                <Link to={'/'}>
                    <p className="text-xl md:text-2xl font-extrabold hover:text-stone-100">QuoteNotes</p>
                </Link>
                <ul className="flex gap-4 md:gap-10 items-center text-sm md:text-base">
                    <NavLink to="/blog"
                        className={({ isActive }) =>
                        ` hover:text-blue-400 ${isActive ? "text-blue-400" : ""}`
                        }
                    >
                        Blog
                    </NavLink>
                    <NavLink to="/login"
                        className={({ isActive }) =>
                        ` hover:text-blue-400 ${isActive ? "text-blue-400" : ""}`
                        }
                    >
                        Login
                    </NavLink>
                    <Link to="/join" className="">
                        <button className="px-3 py-1 md:px-5 md:py-2 font-bold text-stone-900 rounded-sm border border-blue-400 bg-blue-400 transition-all ease-in-out hover:bg-blue-600 hover:border-blue-600 hover:text-white">
                            Join
                        </button>
                        {/* <PrimaryActionBtn children="Join"/> */}
                    </Link>
                </ul>
            </nav>
        </>
    )
}