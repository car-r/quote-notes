import { Link } from "@remix-run/react";

export default function AddContentBtn() {
    return (
        <Link to='/content/new'>
            <div className="text-sm md:text-base px-3 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white rounded text-center cursor-pointer">
                Add Content
            </div>
        </Link>
    )
}