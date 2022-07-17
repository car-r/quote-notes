import { Form, Link, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import AddNoteCard from "~/components/AddNoteCard";
import QuoteDetailCard from "~/components/QuoteDetailCard";
import QuoteEditCard from "~/components/QuoteEditCard";
import QuoteNote from "~/components/QuoteNote";
import QuoteNoteGrid from "~/components/QuoteNoteGrid";
import { prisma } from "~/db.server";

export const loader = async ({params}: any) => {
    const quote = await prisma.quote.findUnique({
        where: { id: params.quoteId}
    })
    const author = await prisma.author.findUnique({
        where: { id: quote?.authorId}
    })
    // id showing red because content is not required for quote model?
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
    const form = await request.formData()
    const formBody = form.get('body')
    const quoteBody = form.get('quoteBody')
    const authorId = form.get('authorId')
    const contentId = form.get('contentId')
    console.log(Object.fromEntries(form))
    const userId = 'cl5j0h3ey00090bmf1xn3f4vo'

    if(form.get('_method') === 'delete') {
        await prisma.quote.delete({ where: { id: params.quoteId}})
        return redirect('/quotes')
    }

    if(form.get('_method') === 'update') {
        const body = formBody
        const fields = {body}
        await prisma.quote.update({where: {id: params.quoteId}, data: fields})
        return redirect('/quotes')
    }


    // add note Action
    if(form.get('_method') !== 'delete') {
        const body = formBody
        const quoteId = params.quoteId
        const fields = { body, quoteId, userId, authorId, contentId}
        await prisma.quoteNote.create({ data: fields })
        return redirect(`/quotes/${params.quoteId}`)
    }
}

export default function QuoteDetail() {
    const quote = useLoaderData()
    console.log(quote)
    
    return (
        <div className="flex flex-col pt-10 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <QuoteDetailCard quote={quote}/>
                <div className="">
                    <QuoteEditCard quote={quote}/>
                    <AddNoteCard quote={quote}/>
                </div>
            </div>
            <div>
                <div className="py-6">
                    <h3 className="text-xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                        Notes
                    </h3>
                </div>
                <QuoteNoteGrid quote={quote}/>
            </div>
        </div>
    )
}