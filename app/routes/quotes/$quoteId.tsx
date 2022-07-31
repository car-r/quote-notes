import { useActionData, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import AddNoteCard from "~/components/AddNoteCard";
import QuoteDetailCard from "~/components/QuoteDetailCard";
import QuoteEditCard from "~/components/QuoteEditCard";
import QuoteNoteGrid from "~/components/QuoteNoteGrid";
import SectionTitle from "~/components/SectionTitle";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async ({params, request}: any) => {
    const quote = await prisma.quote.findUnique({
        where: { id: params.quoteId}
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
    console.log(Object.fromEntries(form))

    if(form.get('_method') === 'delete') {
        await prisma.quote.delete({ where: { id: params.quoteId}})
        return redirect('/quotes')
    }

    if(form.get('_method') === 'update') {
        const body = quoteBody

        const errors = {
            body: ''
        }
    
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


    // add note Action
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
        return redirect(`/quotes/${params.quoteId}`)
    }

    if(form.get('_method') !== ('delete' || 'update' || 'note') ) {
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
    console.log(quote)
    
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <QuoteDetailCard quote={quote}/>
                <div className="">
                    <QuoteEditCard quote={quote} actionData={actionData}/>
                    <AddNoteCard quote={quote} actionData={actionData}/>
                </div>
            </div>
            <div className="mt-20">
                <SectionTitle children={"Notes"}/>
                <QuoteNoteGrid quote={quote}/>
            </div>
        </div>
    )
}