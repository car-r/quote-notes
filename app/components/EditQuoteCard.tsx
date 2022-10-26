import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import UpdateBtn from "./Buttons/UpdateBtn";

export default function EditQuoteCard({quote, actionData, setEdit}: any) {
    
    let transition = useTransition()

    let isDeleting = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "delete"

    let isUpdating = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "update"

    // let formRef = useRef()
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!isUpdating) {
            formRef.current?.reset();
        } else if (isUpdating) {
            setEdit(false)
        }
    },[isUpdating, setEdit])
    console.log('edit quote card props --> ', setEdit)

    return (
        <div className="flex flex-col gap-4 bg-stone-800 px-4 pb-4 rounded-xl md:w-full">
            <div className="flex flex-col py-3 w-full">
                <Form method="post"
                    ref={formRef}
                    className="flex flex-col gap-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 font-light "
                >
                    <div className="flex flex-col gap-4">
                        <button type="submit" name="_method" value="delete" className="flex justify-end relative hover:text-stone-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <textarea
                                    name="quoteBody"
                                    rows={4}
                                    className="w-full mb-0 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-sm md:text-base" 
                                    defaultValue={quote.quote.body}
                                />
                                {actionData?.errors.body && (
                                    <p className="text-red-400 text-sm">{actionData.errors.body}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col">
                            {/* <button type="submit" name="_method" value="update" disabled={isUpdating || isDeleting}
                                className="px-6 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded">
                                {isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Quote"}
                            </button> */}
                            {/* <button type="submit" name="_method" value="update" disabled={isUpdating || isDeleting}
                                className="flex gap-2 px-2 py-2 rounded text-stone-400 hover:bg-stone-600/80 hover:text-stone-300 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                {isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Quote"}
                            </button> */}
                            {/* <button type="submit" name="_method" value="update" disabled={isUpdating || isDeleting}
                                className="flex gap-2 px-2 py-2 rounded text-stone-400 border-2 border-stone-600/40 hover:bg-stone-600/40  hover:text-stone-300 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                {isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Quote"}
                            </button>   */}
                            <button type="submit" name="_method" value="update" disabled={isUpdating || isDeleting}>
                                <UpdateBtn children={isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Quote"}/>                                
                            </button>  
                        </div>
                    </div>           
                </Form>
            </div> 
        </div>
    )
}