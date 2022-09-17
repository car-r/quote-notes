import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server"
import { redirect } from "@remix-run/server-runtime";
import { useActionData, useLoaderData } from "@remix-run/react";
import QuoteCardLarge from "~/components/QuoteCardLarge";
import AddNoteCard from "~/components/AddNoteCard";
import QuoteTags from "~/components/QuoteTags";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request)
    const quote = await prisma.quote.findUnique({
        where: { id: params.quoteId},
        include: {
            tag: true, // Return all fields
            author: true,
            content: true,
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
    const contentId = form.get('contentId')
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
        return redirect('/quotes')
    }


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

        const fields = { body, quoteId, userId, authorId, contentId}
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

        const fields = {body, quoteId, userId}
        await prisma.tag.create({ 
            data: fields
        })
        return redirect(`/quotes/${id}`)
    }
    
    // Action to delete tag
    if(form.get('_method') === 'deleteTag') {
        const values = Object.fromEntries(form)
        const tagId = form.get('tagId')  
        await prisma.tag.delete({ where: { id: tagId}})
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <QuoteCardLarge quote={quote} actionData={actionData}/>
            <div className="flex flex-col gap-6">
                    <AddNoteCard quote={quote} actionData={actionData}/>
                    <QuoteTags quote={quote} actionData={actionData}/>
                </div>
        </div>
    )
}