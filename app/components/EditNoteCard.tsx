import { Form, Link, useTransition } from "@remix-run/react";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
// import { useEdit, useSetEdit } from "~/routes/quoteNotes/$quoteNoteId";
import ActionDataError from "./ActionDataError";
import UpdateBtn from "./Buttons/UpdateBtn";

type ActionData = {
    errors?: {
      body?: string;
    };
};

// type EditNote = {
//     data: any,
//     actionData: ActionData,
//     setEdit: React.Dispatch<React.SetStateAction<boolean>>,
//     edit: React.Dispatch<React.SetStateAction<boolean>>
// }

type EditNote = {
    data: any,
    actionData: ActionData,
}

// interface Props {
//     edit: boolean;
//     setEdit: (edit: boolean) => void
// }

// export default function EditNoteCard({data,  actionData, edit, setEdit}: EditNote)
export default function EditNoteCard({data,  actionData}: EditNote) {
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
    // let { setEdit } = useSetEdit()
    // let { edit } = useEdit()

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
    
    return (
        <div className="md:col-span-2">
            <div className="flex flex-col gap-4 bg-stone-800 px-4 pb-4 rounded-xl md:w-full">
                <div className="flex flex-col py-3 w-full">
                    <Form method="post"
                        ref={formRef}
                        className="flex flex-col gap-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 font-light "
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full justify-between pb-2">
                                <Link to={`/quotenotes/${data.data.id}`} className=" hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </Link>

                                <div onClick={() => setWillDelete(!willDelete)} className=" hover:text-white hover:cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </div>
                            </div>
                            {/* <button type="submit" name="_method" value="delete" className="flex justify-end relative hover:text-stone-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button> */}
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <textarea
                                        name="noteBody"
                                        rows={4}
                                        className="w-full mb-0 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-sm md:text-base" 
                                        defaultValue={data.data.body}
                                    />
                                    {actionData?.errors?.body && (
                                        <ActionDataError children={actionData.errors.body}/>
                                    )}
                                </div>
                            </div>
                        </div>
                        <input hidden name="quoteId" value={data.data.quote.id}/>
                        <div className="flex flex-col md:flex-row">
                            {/* <div className="flex flex-col">
                                <button type="submit" name="_method" value="update" disabled={isUpdating} className="px-6 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded">
                                    {isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Note"}
                                </button> 
                            </div> */}
                            <div className="flex flex-row">
                            {!willDelete ? 
                                <button 
                                    type="submit" name="_method" value="update" disabled={isUpdating || isDeleting} >
                                    <UpdateBtn children={isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Author"} />
                                </button> 
                                :
                                <button 
                                    type="submit" name="_method" value="delete" disabled={isUpdating || isDeleting}
                                    className="py-2 px-2 flex gap-2 text-sm items-center text-white rounded bg-red-400 border-2 border-red-400  hover:bg-red-600 hover:border-red-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    {isDeleting ? "Deleting..." : "Delete Note"}
                                </button> 
                            }
                                {/* <button type="submit" name="_method" value="update" disabled={isUpdating} className="">
                                    <UpdateBtn children={isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Note"} />
                                </button>  */}
                            </div>
                        </div>           
                    </Form>
                </div> 
            </div>
        </div>
    )
}