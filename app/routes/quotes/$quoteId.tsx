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
    const authorId = form.get('authorId')
    const contentId = form.get('contentId')
    console.log(Object.fromEntries(form))
    const userId = 'cl5j0h3ey00090bmf1xn3f4vo'

    if(form.get('_method') === 'delete') {
        await prisma.quote.delete({ where: { id: params.quoteId}})
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
    const notes = quote.notes
    console.log(quote)
    return (
        <div className="flex flex-col pt-10 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                    <div className="p-4 mb-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60">
                        <p className="text-xl text-center pb-6 italic font-semibold">"{quote.quote.body}"</p>
                        <p className="font-light"><Link to={`/authors/${quote.author.id}`}>{quote.quote.authorName}</Link>, <span className="font-thin"><Link to={`/content/${quote.content.id}`}>{quote.content.title}</Link></span></p>
                    </div>
                    {/* <Form method="post">
                        <button
                            name="_method"
                            value="delete"
                            className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600"
                        >
                            Delete
                        </button>
                    </Form> */}
                </div>
                <div className="">
                <div className="flex flex-col gap-1 bg-stone-800 p-4 rounded-lg max-w-3xl mb-4">
                        <div className="flex flex-col py-3 border-b border-stone-700 w-full">
                            <p className="text-sm font-semibold tracking-wider uppercase">Quote ID: </p>
                            <p className="truncate ..."><span className="font-thin text-lg truncate">{quote.quote.id}</span></p>
                        </div>
                        <div className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0">
                            <p className="text-sm font-semibold tracking-wider uppercase">Quote created</p>
                            <p><span className="font-thin text-lg">{quote.quote.createdAt}</span></p>
                        </div>
                        <div className="mt-6 flex flex-col">
                            <Form method="post">
                                <button
                                    name="_method"
                                    value="delete"
                                    className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600 flex w-full justify-center"
                                >
                                    Delete Quote
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </Form>
                        </div>
                    </div>
                    <Form className="flex flex-col" method="post" name="_method">
                        <label>
                        <textarea
                            name="body"
                            rows={4}
                            className="w-full mb-4 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-lg"
                        />
                        </label>
                        <input type="hidden" name="authorId" value={quote.quote.authorId}/>
                        <input type="hidden" name="contentId" value={quote.quote.contentId}/>
                        <button className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600">Add Note</button>
                    </Form>
                </div>
            </div>
            <div>
                <div className="py-6">
                    <h3 className="text-xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                        Notes
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quote.notes.map((note: any) => (
                        <Link to={`/quotenotes/${note.id}`} key={note.id} >
                            <QuoteNote note={note}/>
                        </Link>
                    ))}
                </div>
            </div>
            
        </div>
    )
}