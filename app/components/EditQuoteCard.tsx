import { Form, Link, useTransition } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import ActionDataError from "./ActionDataError";
import UpdateBtn from "./Buttons/UpdateBtn";

// type EditQuote = {
//     quote: any,
//     actionData: any,
//     setEdit: React.Dispatch<React.SetStateAction<boolean>>,
//     edit: React.Dispatch<React.SetStateAction<boolean>>
// }

export type Quote = {
    quote: {
        body: string
        id: string
        bookId: string
    }
}

export type ActionData = {
    errors: {
        body: string
    }
}

type EditQuote = {
    quote: Quote,
    actionData: ActionData,
}
// export default function EditQuoteCard({quote, actionData, setEdit, edit}: EditQuote)

export default function EditQuoteCard({quote, actionData}: EditQuote) {
    const [willDelete, setWillDelete] = useState(false)
    let transition = useTransition()

    let isDeleting = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "delete"

    let isUpdating = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "update"

    // let formRef = useRef()
    const formRef = useRef<HTMLFormElement>(null)

    // useEffect(() => {
    //     if (!isUpdating) {
    //         formRef.current?.reset();
    //     } else if (isUpdating) {
    //         setEdit(false)
    //     }
    // },[isUpdating, setEdit, edit])

    useEffect(() => {
        if (!isUpdating) {
            formRef.current?.reset();
        } 
    },[isUpdating])
    console.log('edit quote card props --> ', quote)

    return (
        <div className="flex flex-col gap-4 bg-stone-800 px-4 pb-4 md:px-10 md:py-6 rounded-xl md:w-full">
            <div className="flex flex-col py-3 w-full">
                <Form method="post"
                    ref={formRef}
                    className="flex flex-col gap-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 font-light "
                >
                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="flex justify-between">
                            <Link to={`/quotes/${quote.quote.id}`} className="hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Link>
                            <div onClick={() => setWillDelete(!willDelete)} className="flex justify-end relative hover:text-stone-100 hover:cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4 ">
                            <div className="flex flex-col gap-1">
                                <textarea
                                    name="quoteBody"
                                    rows={5}
                                    className="w-full mb-0 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-sm md:text-base" 
                                    defaultValue={quote.quote.body}
                                />
                                {actionData?.errors.body && (
                                    <ActionDataError children={actionData.errors.body} />
                                )}
                            </div>
                        </div>
                        <input hidden name="bookId" defaultValue={quote.quote.bookId}/>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col">
                            {!willDelete ? 
                            <button type="submit" name="_method" value="update" disabled={isUpdating || isDeleting}>
                                <UpdateBtn children={isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Quote"}/>                                
                            </button>  
                            :
                            <button type="submit" name="_method" value="delete" disabled={isUpdating || isDeleting}
                            className="py-2 px-2 flex justify-center items-center gap-2 text-sm text-white rounded bg-red-400 border-2 border-red-400 hover:bg-red-600 hover:border-red-600"
                            >     
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>      
                                {isDeleting ? "Deleting..." : "Delete Quote"}                         
                            </button> 
                            }
                        </div>
                    </div>           
                </Form>
            </div> 
        </div>
    )
}