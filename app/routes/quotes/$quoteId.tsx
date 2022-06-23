import { Form, Link, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import QuoteNote from "~/components/QuoteNote";
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
        where: {quoteId: params.quoteId}
    })
    return {author, quote, content, notes}
}

export const action =async ({ request, params }: any) => {
    const form = await request.formData()
    const formBody = form.get('body')
    console.log(Object.fromEntries(form))
    const userId = 'cl4kuy4wu0009lnmfgbvhhww8'

    if(form.get('_method') === 'delete') {
        await prisma.quote.delete({ where: { id: params.quoteId}})
        return redirect('/quotes')
    }

    // add note Action
    if(form.get('_method') !== 'delete') {
        const body = formBody
        const quoteId = params.quoteId
        const fields = {body, quoteId, userId}
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
                <div className="md:col-span-2">
                    <div className="p-4 mb-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60">
                        <p className="text-xl text-center pb-6 italic font-semibold">"{quote.quote.body}"</p>
                        <p className="font-light"><Link to={`/authors/${quote.author.id}`}>{quote.quote.authorName}</Link>, <span className="font-thin"><Link to={`/content/${quote.content.id}`}>{quote.content.title}</Link></span></p>
                    </div>
                    <Form method="post">
                        <button
                            name="_method"
                            value="delete"
                            className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600"
                        >
                            Delete
                        </button>
                    </Form>
                </div>
                <div className="">
                    <Form className="flex flex-col" method="post" name="_method">
                        <label>
                        <textarea
                            name="body"
                            rows={4}
                            className="w-full mb-4 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-lg"
                        />
                        </label>
                        <button className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600">Add Note</button>
                    </Form>
                </div>
            </div>
            <div>
            <div className="py-6">
                <h3 className="text-xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">Quote Notes</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quote.notes.map((note: any) => (
                    <div key={note.id} >
                        <QuoteNote note={note}/>
                    </div>
                ))}
            </div>
            </div>
            
        </div>
    )
}