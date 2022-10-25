import { Link } from "@remix-run/react";
import TopBtn from "./TopBtn";

export default function EditQuoteBtn({data, edit, setEdit}: any) {
    console.log('edit quote btn -->', data)
    return (
        <>
            <Link to={`/quotes/${data.quote.id}/edit`} onClick={() => setEdit(!edit)}>
                {/* <div className="text-sm md:text-base px-3 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white rounded text-center cursor-pointer">
                    Edit Quote
                </div> */}
                <TopBtn children={`Edit Quote`}/>
            </Link>
        </>
    )
}