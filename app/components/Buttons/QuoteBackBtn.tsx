import { Link } from "@remix-run/react";
import TopBackBtn from "./TopBackBtn";
import TopBtn from "./TopBtn";

export default function QuoteBackBtn({quote, edit, setEdit}: any) {
    console.log('back quote btn -->', quote)
    return (
        <Link to={`/quotes/${quote.quote.id}`} onClick={() => setEdit(!edit)}>
            {/* <div className="text-sm md:text-base px-3 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white rounded text-center cursor-pointer">
                Go Back
            </div> */}
            {/* <TopBtn children={`Go back`}/> */}
            <TopBackBtn children={`Go back`}/>
        </Link>
    )
}