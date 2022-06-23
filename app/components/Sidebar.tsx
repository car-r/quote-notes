import { Link } from "@remix-run/react";

export default function Sidebar() {
    return (
        <div className="hidden md:block pr-10 py-4">
            <Link to={'/'}>
                <p className="text-2xl font-extrabold py-2">QuoteNotes</p>
            </Link>
            <ul className="flex flex-col gap-4">
                <Link to='/quotes'>
                    <li className="py-1 px-3 border border-stone-900 rounded-md hover:border-blue-400">
                        Quotes
                    </li>
                </Link>
                <Link to='/content'>
                    <li className="py-1 px-3 border border-stone-900 rounded-md hover:border-blue-400">
                        Content
                    </li>
                </Link>
                <Link to='/authors'>
                    <li className="py-1 px-3 border border-stone-900 rounded-md hover:border-blue-400">
                        Authors
                    </li>
                </Link>
            </ul>
        </div>
)
}