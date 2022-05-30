import { Form, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";

export const loader = async ({params}: any) => {
    const quote = await prisma.quote.findUnique({
        where: { id: params.quoteId}
    })
    const author = await prisma.author.findUnique({
        where: { id: quote?.authorId}
    })
    return {author, quote}
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
            <p>{quote.quote.body}</p>
            <Form method="post">
                <button
                    name="_method"
                    value="delete"
                    className="px-4 py-2 bg-green-500"
                >
                    Delete
                </button>
            </Form>
        </div>
    )
}