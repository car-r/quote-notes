import { Link } from "@remix-run/react";
import SecondaryAddBtn from "./SecondaryAddBtn";

export default function AddBookBtn() {
    return (
        <Link to='/books/new'>
            {/* <div className="text-sm md:text-base px-3 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white rounded text-center cursor-pointer">
                Add Book
            </div> */}
            <SecondaryAddBtn children={`Add Book`}/>
        </Link>
    )
}