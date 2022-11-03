import { Link, NavLink } from "@remix-run/react"
import TopBtn from "./TopBtn"

export default function EditAuthorBtn({data, edit, setEdit}: any) {
    console.log('edit author btn -->', data, edit)
    return (
        <>
            <NavLink to={`/authors/${data.author.id}/edit`} 
                className={({ isActive }) =>
                `text-xs xs:text-sm md:text-base px-3 py-2 text-white rounded text-center cursor-pointer border-2 border-stone-600 bg-transparent hover:bg-stone-400/40 hover:border-stone-600 ${isActive ? "bg-stone-400/40 border-stone-600 " : ""}`
                }
                >                    
                {'Edit Author'}
            </NavLink>
            {/* <Link to={`/authors/${data.author.id}/edit`} onClick={() => setEdit(!edit)}>
                <TopBtn children={`Edit Author`}/>
            </Link> */}
        </>
    )
}