import { Link } from "@remix-run/react";
import SecondaryAddBtn from "./SecondaryAddBtn";
import TopAddBtn from "./TopAddBtn";

export default function AddQuoteBtn() {
    return (
        <Link to='/quotes/new'>
            {/* <div className="text-sm md:text-base px-3 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white rounded text-center cursor-pointer">
                Add Quote
            </div> */}
            {/* <SecondaryAddBtn children={`Add Quote`}/> */}
            <TopAddBtn children={`Add Quote`}/>
        </Link>
    )
}