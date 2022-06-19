import { Form, Link, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
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
    return {author, quote, content}
}

export const action =async ({ request, params }: any) => {
    const form = await request.formData()
    if(form.get('_method') === 'delete') {
        await prisma.quote.delete({ where: { id: params.quoteId}})
        return redirect('/quotes')
    }
}

export default function QuoteDetail() {
    const quote = useLoaderData()
    console.log(quote)
    return (
        <div>
            <h2>Quote Detail</h2>
            <div className="p-4 mb-6 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60">
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
    )
}