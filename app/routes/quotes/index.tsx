import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";

import { prisma } from "~/db.server";

export const loader = async () => {
    const quotes = await prisma.quote.findMany()
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
            <div>Quotes Index Page</div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.quotes.map((quote: any) => (
                    <Link to={`/quotes/${quote.id}`} key={quote.id}
                        className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400"
                    >
                        {quote.body}
                    </Link>))
                }
            </div>
            
           
        </>
        
    )
}