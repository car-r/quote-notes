// import { Link } from "@remix-run/react";

export default function EditAuthorBtn({author, edit, setEdit}: any) {
    console.log('edit quote btn -->', author, edit)
    return (
        <div onClick={() => setEdit(!edit)}>
            {edit ? 
                <div className="text-sm md:text-base px-3 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white rounded text-center cursor-pointer">
                    Go Back
                </div>
            :
            <div className="text-sm md:text-base px-3 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white rounded text-center cursor-pointer">
                Edit Author
            </div>
            }
        </div>
    )
}