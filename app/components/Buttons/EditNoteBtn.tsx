import { Link } from "@remix-run/react";

export default function EditNoteBtn({data, edit, setEdit}: any) {
    console.log('edit note btn -->', data)
    return (
        <>
            <Link to={`/quoteNotes/${data.data.id}/edit`} onClick={() => setEdit(!edit)}>
                <div className="text-sm md:text-base px-3 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white rounded text-center cursor-pointer">
                    Edit Note
                </div>
            </Link>
        </>
    )
}