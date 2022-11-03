import { Link, NavLink } from "@remix-run/react";
import TopBtn from "./TopBtn";

export default function EditQuoteBtn({data}: any) {
    // console.log('edit quote btn -->', data)

    return (
        <>
            <NavLink to={`/quotes/${data.quote.id}/edit`} 
            className={({ isActive }) =>
            `text-xs xs:text-sm md:text-base px-3 py-2 text-white rounded text-center cursor-pointer border-2 border-stone-600 bg-transparent hover:bg-stone-400/40 hover:border-stone-600 ${isActive ? "bg-stone-400/40 border-stone-600 " : ""}`
            }
            >


                    
                    {'Edit Quote'}
            </NavLink>
            {/* <Link to={`/quotes/${data.quote.id}/edit`}>
                <TopBtn children={`Edit Quote`}/>
            </Link> */}
        </>
    )
}