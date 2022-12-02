import { Link, NavLink } from "@remix-run/react";
import LoginBtn from "../Buttons/LoginBtn";
import PrimaryActionBtn from "../Buttons/PrimaryActionBtn";

export default function NavBar() {
    return (
        <>
            <nav className="flex items-center text-stone-200 py-6 justify-between w-full px-4 mx-auto max-w-5xl">
                <Link to={'/'}>
                    <p className="text-2xl font-extrabold hover:text-stone-100">QuoteNotes</p>
                </Link>
                <ul className="flex gap-4 items-center">
                    <NavLink to="/blog">
                        Blog
                    </NavLink>
                    <Link to="/login">
                        <LoginBtn children="Login"/>
                    </Link>
                    <Link to="/join" className="">
                        <PrimaryActionBtn children="Join"/>
                    </Link>
                </ul>
            </nav>
        </>
    )
}