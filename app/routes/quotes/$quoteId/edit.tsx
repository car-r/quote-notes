import EditQuoteCard from "~/components/EditQuoteCard";

import { Form, useActionData, useLoaderData, useOutletContext, useTransition } from "@remix-run/react"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { redirect } from "@remix-run/node";
import { useEffect, useRef } from "react";

export const loader = async ({params}: any) => {
    const quote = await prisma.quote.findUnique({
        where: { id: params.quoteId},
        include: {
            tag: true, // Return all fields
            author: true,
        }
    })
    return {quote}
}

export const action = async ({ request, params }: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const formBody = form.get('body')
    const quoteBody = form.get('quoteBody')
    const authorId = form.get('authorId')
    const bookId = form.get('bookId')
    const id = params.quoteId
    const isFavorited = form.get('isFavorited')
    const tagBody = form.get('tagBody')
    const date: any = new Date
    const updatedAt = date.toISOString()
    console.log(Object.fromEntries(form))

    // Action to delete quote
    if(form.get('_method') === 'delete') {
        await prisma.quote.delete({ where: { id: params.quoteId}})
        return redirect('/quotes')
    }

    // Action to update quote
    if(form.get('_method') === 'update') {
        const body = quoteBody

        const errors = {
            body: ''
        }
    
        // validation check to make sure body isn't less than 4 characters
        function checkBody(body: any) {
            if(!body || body.length < 4) {
                return errors.body = `Quote too short`
            }
        }
    
        checkBody(body)
    
        if (errors.body) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = {body}
        await prisma.quote.update({where: {id: params.quoteId}, data: fields})
        return redirect(`/quotes/${params.quoteId}`)
    }
}

export default function EditQuote() {
    const quote = useLoaderData()
    const actionData = useActionData()
    const [edit, setEdit]: any = useOutletContext()

    // let transition = useTransition()

    // let isDeleting = 
    //     transition.state === "submitting" &&
    //     transition.submission.formData.get("_method") === "delete"

    // let isUpdating = 
    //     transition.state === "submitting" &&
    //     transition.submission.formData.get("_method") === "update"

    // // let formRef = useRef()
    // const formRef = useRef<HTMLFormElement>(null)

    // useEffect(() => {
    //     if (!isUpdating) {
    //         formRef.current?.reset();
    //     } else if (isUpdating) {
    //         setEdit(false)
    //     }
    // },[isUpdating, setEdit])

    
    return (
        <div className="md:col-span-2">
            <EditQuoteCard quote={quote} actionData={actionData} setEdit={setEdit} />
            {/* <EditQuoteCard quote={quote} actionData={actionData} setEdit={setEdit} /> */}
            {/* <div className="flex flex-col gap-4 bg-stone-800 px-4 pb-4 rounded-xl md:w-full">
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
                                <button type="submit" name="_method" value="update" disabled={isUpdating || isDeleting}
                                    className="px-6 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded">
                                    {isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Quote"}
                                </button> 
                            </div>
                        </div>           
                    </Form>
                </div> 
            </div> */}
        </div>
    )
}