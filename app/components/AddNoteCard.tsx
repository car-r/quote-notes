import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import ActionDataError from "./ActionDataError";
import PrimaryActionBtn from "./Buttons/PrimaryActionBtn";




export default function AddNoteCard({quote, actionData}: any) {
    // console.log(actionData)
    let transition = useTransition()
    let isAddingNote = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "note"

    // let formRef = useRef()
    const formRef = useRef<HTMLFormElement>(null)

    // useEffect(() => {
    //     if (!isAddingNote) {
    //         formRef.current?.reset();
    //     } else if (isAddingNote) {
    //         setEdit(false)
    //     }
    // },[isAddingNote, setEdit])

    useEffect(() => {
        if (!isAddingNote) {
            formRef.current?.reset();
        } 
    },[isAddingNote])

    console.log('addnotecard', quote)
    
    return (
        <div className="p-4 bg-stone-800 rounded-lg">
            <Form className="flex flex-col gap-4 " method="post" name="_method" ref={formRef}>
                <label>
                    <textarea
                        name="body"
                        rows={4}
                        className="w-full text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-md"
                    />
                    {actionData?.errors.noteBody && (
                    <ActionDataError children={actionData.errors.noteBody}/>
                    )}
                    {actionData?.errors.pricingPlan &&  (
                        <ActionDataError children={actionData.errors.pricingPlan} />
                    )}
                </label>
                <input type="hidden" name="authorId" value={quote.quote.authorId}/>
                <input type="hidden" name="bookId" value={quote.quote.bookId}/>
                <input hidden type="text" name="pricingPlan" defaultValue={quote.user.pricingPlan}/>
                <input hidden type="number" name="quoteNoteCount" defaultValue={quote.user._count.quoteNote}/>
                <button name="_method" value="note">
                    <PrimaryActionBtn children={isAddingNote ? "Adding..." : "Add Note"}/>
                </button>
            </Form>
        </div>
    )
}