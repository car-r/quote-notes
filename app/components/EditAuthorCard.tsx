import { Form, useOutletContext, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import ActionDataError from "./ActionDataError";

export default function EditAuthorCard({data, actionData}: any) {
    let transition = useTransition()

    let isDeleting = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "delete"
    
    let isUpdating = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "update"

    // let formRef = useRef()
    const formRef = useRef<HTMLFormElement>(null)
    const [edit, setEdit]: any = useOutletContext()

    useEffect(() => {
        if (!isUpdating) {
            formRef.current?.reset();
        } else if (isUpdating) {
            setEdit(false)
        }
    },[isUpdating, setEdit, edit])

    console.log('edit author card --> ', data)
    return (
        <div className="flex flex-col p-4 min-h-full justify-center border-2 border-stone-800 rounded-lg">
            <Form method="post"
                ref={formRef}
                className="flex flex-col gap-6 rounded-md text-stone-300/60 font-light"
            >
                <div className="flex flex-col gap-4">
                        <button type="submit" name="_method" value="delete" className="flex justify-end relative hover:text-stone-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Author Name
                        </label>
                        {actionData?.errors.name ? (
                            <div className="flex flex-col">
                                <input type="text" name="name" className="px-2 py-1 border border-red-400 bg-stone-700 rounded" defaultValue={data.data.name}/>
                                {/* <p className="text-red-400 text-sm">{actionData.errors.name}</p> */}
                                <ActionDataError children={actionData.errors.name}/>
                            </div>
                        ) : 
                            <input type="text" name="name" className="px-2 py-1 border border-stone-800 bg-stone-700 rounded w-full" defaultValue={data.data.name}/>
                        }
                    </div>
                    
                    <div className="flex flex-col gap-1 md:gap-2">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Author Image URL
                        </label>
                        {actionData?.errors.imgUrl ? (
                            <div className="flex flex-col">
                                <input type="text" name="imgUrl" className="px-2 py-1 border border-red-400 bg-stone-700 rounded" defaultValue={data.data.imgUrl}/>
                                {/* <p className="text-red-400 text-sm">{actionData.errors.imgUrl}</p> */}
                                <ActionDataError children={actionData.errors.imgUrl}/>
                            </div>
                        ) :
                            <input type="text" name="imgUrl" className="px-2 py-1 border border-stone-800 bg-stone-700 rounded" defaultValue={data.data.imgUrl}/>
                        }
                    </div>
                </div>           
                <div className="flex flex-col">
                    <button 
                        type="submit" name="_method" value="update" disabled={isUpdating || isDeleting} 
                        className="px-4 py-2 font-semibold text-stone-900 border-2 border-blue-400 bg-blue-400 
                        hover:border-blue-500/95 hover:bg-blue-500/95 rounded text-center cursor-pointer"
                    >
                        {isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Author"}
                    </button> 
                    {/* <button type="submit" className="px-4 py-2 border-2 border-blue-400 hover:bg-blue-400/30 text-white rounded text-center cursor-pointer">Update</button>  */}
                    {/* <button type="submit" name="_method" value="delete" className="px-6 py-2 border border-red-500 text-white rounded hover:bg-red-700">Delete</button> */}
                </div>
            </Form>
        </div> 
    )
}