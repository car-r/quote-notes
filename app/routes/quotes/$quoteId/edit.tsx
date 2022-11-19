import EditQuoteCard from "~/components/EditQuoteCard";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";

import { useActionData, useLoaderData, useOutletContext } from "@remix-run/react"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { redirect } from "@remix-run/node";
import { updateQuote } from "~/models/quote.server";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({params}) => {
    const quote = await prisma.quote.findUnique({
        where: { id: params.quoteId},
        include: {
            tag: true, // Return all fields
            author: true,
        }
    })
    return {quote}
}

export const action: ActionFunction = async ({ request, params }) => {
    const userId = await requireUserId(request);
    invariant(params.quoteId, "quoteId not found");
    const form = await request.formData()
    const quoteBody = form.get('quoteBody') as string
    // const bookId = form.get('bookId') as string
    // const date: any = new Date
    // const updatedAt = date.toISOString()
    console.log(Object.fromEntries(form))

    // Action to delete quote
    if(form.get('_method') === 'delete') {
        await prisma.quote.delete({ where: { id: params.quoteId}})
        return redirect('/quotes')
    }

    // Action to update quote
    if(form.get('_method') === 'update') {
        const body = quoteBody.trim()

        const errors = {
            body: ''
        }
    
        // validation check to make sure body isn't less than 4 characters
        function checkBody(body: string) {
            if(!body || body.length < 4) {
                return errors.body = `Quote too short`
            }
        }
    
        checkBody(body)
    
        if (errors.body) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        // const fields = {body}
        // await prisma.quote.update({where: {id: params.quoteId}, data: fields})
        await updateQuote({ userId, id: params.quoteId, body})
        // return redirect(`/quotes/${params.quoteId}`)
        return redirect(`/quotes/${params.quoteId}`)
    }
}

export default function EditQuote() {
    const quote = useLoaderData()
    const actionData = useActionData()
    const [edit, setEdit]: any = useOutletContext()

    
    return (
        <div className="md:col-span-2">
            <EditQuoteCard quote={quote} actionData={actionData} setEdit={setEdit} edit={edit}  />
        </div>
    )
}