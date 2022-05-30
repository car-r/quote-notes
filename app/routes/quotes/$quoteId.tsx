import { useLoaderData } from "@remix-run/react";
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

export default function QuoteDetail() {
    const quote = useLoaderData()
    console.log(quote)
    return (
        <div>
            <h2>Quote Detail</h2>
            <p>{quote.quote.body}</p>
        </div>
    )
}