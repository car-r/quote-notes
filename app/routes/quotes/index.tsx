import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import AddQuoteCard from "~/components/AddQuoteCard";

import { prisma } from "~/db.server";

export const loader = async () => {
    const quotes = await prisma.quote.findMany(
        {orderBy: [
            {
                createdAt: 'desc',
            },
        ],}
    )
    const authors = await prisma.author.findMany()
    return {quotes, authors}
}

export default function QuotesIndex() {

    const data = useLoaderData()
    // const quotes = data[0]
    // const authors = data[1]
    console.log(data)
    return (
        <>
            <div className="flex flex-col pt-10 max-w-4xl">
                <div className="pb-6">
                    <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    Your Quotes
                    </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <AddQuoteCard />
                    {data.quotes.map((quote: any) => (
                        <Link to={`/quotes/${quote.id}`} key={quote.id}
                            className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400"
                        >
                            <p className="text-xl text-center pb-6 italic font-semibold">"{quote.body}"</p>
                            <p className="font-light"><Link to={`/authors/${quote.authorId}`}>{quote.authorName}</Link></p>
                        </Link>))
                    }
                </div>
            </div>
            
           
        </>
        
    )
}