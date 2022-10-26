import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import PrimaryActionBtn from "./Buttons/PrimaryActionBtn";
import SuccessBtn from "./Buttons/SuccessBtn";

export default function AddNoteCard({quote, actionData, setEdit}: any) {
    // console.log(actionData)
    let transition = useTransition()
    let isAddingNote = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "note"

    // let formRef = useRef()
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!isAddingNote) {
            formRef.current?.reset();
        } else if (isAddingNote) {
            setEdit(false)
        }
    },[isAddingNote, setEdit])
    
    return (
        <div className="p-4 bg-stone-800 rounded-lg">
            <Form className="flex flex-col gap-4 " method="post" name="_method" ref={formRef}>
                <label>
                <textarea
                    name="body"
                    rows={4}
                    className="w-full text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-md"
                />
                </label>
                {actionData?.errors.noteBody && (
                    <p className="text-red-400 text-sm mb-2">{actionData.errors.noteBody}</p>
                )}
                <input type="hidden" name="authorId" value={quote.quote.authorId}/>
                <input type="hidden" name="bookId" value={quote.quote.bookId}/>
                {/* <button name="_method" value="note"
                    className="px-4 py-2 mt-2 bg-blue-400 rounded text-white hover:bg-blue-600">
                    {isAddingNote ? "Adding..." : "Add Note"}
                </button> */}
                <button name="_method" value="note">
                    <PrimaryActionBtn children={isAddingNote ? "Adding..." : "Add Note"}/>
                    {/* <SuccessBtn children={isAddingNote ? "Adding..." : "Add Note +"}/> */}
                </button>
            </Form>
        </div>
    )
}