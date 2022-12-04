import { NavLink } from "@remix-run/react";

export default function EditQuoteBtn() {
    // console.log('edit quote btn -->', data)

    return (
        <>
            <NavLink to={`/user/edit`} 
            className={({ isActive }) =>
            `text-xs xs:text-sm md:text-base px-3 py-2 text-stone-300 rounded text-center cursor-pointer border-2 border-stone-600 bg-transparent transition-all hover:ease-in-out hover:bg-stone-300/10 hover:border-stone-400 ${isActive ? "bg-stone-300/10 border-stone-400 " : ""}`
            }
            >


                    
                {'Edit User'}
            </NavLink>
            {/* <Link to={`/quotes/${data.quote.id}/edit`}>
                <TopBtn children={`Edit Quote`}/>
            </Link> */}
        </>
    )
}