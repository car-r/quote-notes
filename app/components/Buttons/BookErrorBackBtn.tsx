import { Link } from "@remix-run/react";
import TopBackBtn from "./TopBackBtn";

export default function BookErrorBackBtn() {

    return (
        <Link to={`/books`} >
            {/* <div className="text-sm md:text-base px-3 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white rounded text-center cursor-pointer">
                Go Back
            </div> */}
            <TopBackBtn children={``} />
        </Link>
    )
}