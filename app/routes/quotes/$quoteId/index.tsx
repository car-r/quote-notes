import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server"
import { redirect } from "@remix-run/server-runtime";
import { useActionData, useLoaderData } from "@remix-run/react";
import QuoteCardLarge from "~/components/QuoteCardLarge";
import { getQuoteWithAuthorAndBook } from "~/models/quote.server";
import invariant from "tiny-invariant";
// import AddNoteCard from "~/components/AddNoteCard";
// import QuoteTags from "~/components/QuoteTags";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request)
    invariant(params.quoteId, "quoteId not found");
    // const quote = await prisma.quote.findUnique({
    //     where: { id: params.quoteId},
    //     include: {
    //         tag: true, // Return all fields
    //         author: true,
    //         book: true,
    //     }
    // })

    const quote = await getQuoteWithAuthorAndBook({ userId, id: params.quoteId })

    if (!quote) {
        throw new Response("Can't find quote.", {
            status: 404,
        })
    }

    return {quote}
}

export const action = async ({ request, params }: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const formBody = form.get('body')
    // const quoteBody = form.get('quoteBody')
    const authorId = form.get('authorId')
    const bookId = form.get('bookId')
    const id = params.quoteId
    const isFavorited = form.get('isFavorited')
    const tagBody = form.get('tagBody')
    const date: any = new Date
    const updatedAt = date.toISOString()
    console.log(Object.fromEntries(form))


    // Action to create a quoteNote
    if(form.get('_method') === 'note') {
        const body = formBody
        const quoteId = params.quoteId

        const errors = {
            noteBody: ''
        }
    
        function checkBody(body: any) {
            if(!body || body.length < 4) {
                return errors.noteBody = `Note too short`
            }
        }
    
        checkBody(body)
    
        if (errors.noteBody) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = { body, quoteId, userId, authorId, bookId}
        await prisma.quoteNote.create({ data: fields })

        // update the createdAt date when a new note is added to a quote
        await prisma.quote.update({
            where: {id: quoteId},
            data: { updatedAt: updatedAt}
        })

        return redirect(`/quotes/${params.quoteId}`)
    }

    // Action to add tag
    if(form.get('_method') === 'tag') {
        const oldBody: string = tagBody
        const quoteId: string = params.quoteId

        const errors = {
            tagBody: ''
        }

        const body = oldBody.replace(/\s+/g, '-').toLowerCase()

        function checkBody(body: any) {
            if(!body || body.length < 3) {
                return errors.tagBody = `Tag too short`
            }
        }
    
        checkBody(body)

    
        if (errors.tagBody) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = {body, quoteId, userId, bookId}
        await prisma.tag.create({ 
            data: fields
        })
        return redirect(`/quotes/${id}`)
    }
    
    // Action to delete tag
    if(form.get('_method') === 'deleteTag') {
        const values = Object.fromEntries(form)
        const tagId = form.get('tagId')  
        await prisma.tag.delete({ where: { id: tagId }})
        return redirect(`/quotes/${id}`)
    }

    // Action to update favorite status of quote
    if(form.get('_method') !== ('delete' || 'update' || 'note' || 'deleteTag' || 'tag') ) {
        await prisma.quote.update({
            where: { id: id },
            data: { isFavorited: isFavorited }
        })
        return redirect(`/quotes/${id}`)
    }

    
}

export default function QuoteIdHome() {
    const quote = useLoaderData()
    const actionData = useActionData()
    console.log('quoteIndex --> ', quote)
    return (
        // <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        //     <QuoteCardLarge quote={quote} actionData={actionData}/>
        //     <div className="flex flex-col gap-6">
        //             <AddNoteCard quote={quote} actionData={actionData}/>
        //             <QuoteTags quote={quote} actionData={actionData}/>
        //         </div>
        // </div>
        <div className="md:col-span-2">
            <QuoteCardLarge quote={quote} actionData={actionData}/>
        </div>
    )
}