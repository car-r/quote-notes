import { useLoaderData, Link } from "@remix-run/react"
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const author = await prisma.author.findUnique({
        where: { id: params.authorId }
    })
    const quotes = await prisma.quote.findMany({
        where: { authorId: params.authorId}
    })
    return {author, quotes}
}

export default function AuthorDetail() {
    const data = useLoaderData()
    console.log(data)
    const quotes = data.quotes
    return (
        <div>
            <h2>{data.author.firstName}</h2>
            {data.quotes.map((quote: any) => (
                <Link to={`/quotes/${quote.id}`} key={quote.id}>
                    <div className="p-4 mb-6 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400">
                        <p className="text-xl text-center pb-6 italic font-semibold">"{quote.body}"</p>
                        
                    </div>
                </Link>
            ))}    
        </div>
    )
}