import { Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import { useState } from "react";
import AddNoteCard from "~/components/AddNoteCard";
import EditQuoteBtn from "~/components/EditQuoteBtn";
import EditQuoteCard from "~/components/EditQuoteCard";
import PageTitle from "~/components/PageTitle";
import QuoteBackBtn from "~/components/QuoteBackBtn";
import QuoteCardLarge from "~/components/QuoteCardLarge";
import QuoteDetailCard from "~/components/QuoteDetailCard";
import QuoteCard from "~/components/QuoteDetailCard";
import QuoteNoteGrid from "~/components/QuoteNoteGrid";
import QuoteTags from "~/components/QuoteTags";
import SectionTitle from "~/components/SectionTitle";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);
    const quote = await prisma.quote.findUnique({
        where: { id: params.quoteId},
        include: {
            tag: true, // Return all fields
            author: true,
        }
    })

    const author = await prisma.author.findUnique({
        where: { id: quote?.authorId}
    })

    const content = await prisma.content.findUnique({
        where: { id: quote?.contentId}
    })

    const notes = await prisma.quoteNote.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        where: {quoteId: params.quoteId}
    })
    return {author, quote, content, notes}
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

export default function QuoteDetail() {
    const quote = useLoaderData()
    const actionData = useActionData()
    const [edit, setEdit] = useState(false)
    console.log('quoteId route --> ', quote)
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            {edit ? 
                <PageTitle children={`Quote`} btn={<QuoteBackBtn  quote={quote} edit={edit} setEdit={setEdit}/>}/>
                :
                <PageTitle children={`Quote`} btn={<EditQuoteBtn  quote={quote} edit={edit} setEdit={setEdit}/>}/>
            }
            <Outlet />
            <div className="mt-20 mb-28">
                <SectionTitle children={"Notes"}/>
                <QuoteNoteGrid quote={quote}/>
            </div>
        </div>
    )
}