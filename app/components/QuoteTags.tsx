import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function QuoteTags({quote, actionData, setEdit}: any) {

    let transition = useTransition()
    let isDeleting = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "deleteTag"

    let isAddingTag = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "tag"

    // let formRef = useRef()
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!isAddingTag) {
            formRef.current?.reset();

        } else if (isAddingTag) {
            setEdit(false)
        }
    },[isAddingTag, setEdit])

    console.log('quoteTags component -> ', quote.quote)

    return (
        <div className="flex flex-col gap-1 bg-stone-800 px-4 pb-4 pt-1 rounded-lg max-w-3xl mb-4">

            <div className="flex flex-col gap-4">
                <div className="flex flex-col py-3 border-b border-stone-700 w-full">
                    <div className="flex justify-between">
                        <p className="text-sm font-semibold tracking-wider uppercase">Tags</p>
                    </div>
                    <div className="flex gap-1 overflow-auto pt-2 pb-6 scrollbar-thin scrollbar-track-stone-700 scrollbar-thumb-stone-600">
                    {quote.quote.tag?.map((tag: any) => (
                        <Form key={tag.id} method="post" name="_method">
                            <div className="items-center flex text-xs text-stone-300 font-thin truncate px-2 py-1 rounded-xl bg-stone-700 gap-1">
                                <p  className="truncate ... ">
                                    <span>
                                        {tag.body}
                                    </span>
                                </p>
                                <input type="hidden" name="tagId" value={tag.id}/>
                                <button name="_method" value="deleteTag" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="p-1 w-5 h-5 font-bold text-stone-800 rounded-lg hover:text-stone-300 hover:bg-stone-600" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </Form>
                        
                    ))}
                    </div>
                </div>
                <Form className="flex flex-col gap-4 " method="post" name="_method" ref={formRef}>
                    <label className="text-sm flex flex-col font-semibold tracking-wider uppercase">
                        <input type="text" name="tagBody" className="px-2 py-1 border border-stone-800 bg-stone-700 rounded" placeholder="enter a tag"/>
                        {actionData?.errors.tagBody && (
                            <p className="text-red-400 text-sm mb-2">{actionData.errors.tagBody}</p>
                        )}
                    </label>
                    <input hidden name="bookId" value={quote.quote.bookId} />
                    {/* <button name="_method" value="tag"
                        className="px-4 py-2 mt-4 border-2 border-blue-400 hover:bg-blue-400 text-white rounded text-center cursor-pointer">
                        {isAddingTag ? "Adding..." : "Add Tag"}
                    </button> */}
                    <div className="flex justify-end">
                        <button name="_method" value="tag"
                            className="rounded text-sm text-center cursor-pointer px-3 py-1 font-base text-white   bg-blue-400/80 hover:bg-blue-600 ">
                            {isDeleting ? "Deleting..." : isAddingTag ? "Adding..." : "Add Tag +"}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}