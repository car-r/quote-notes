import { useLoaderData } from "@remix-run/react"
import { Link } from "@remix-run/react"
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const content = await prisma.content.findUnique({
        where: { id: params.contentId }
    })
    const quotes = await prisma.quote.findMany({
        where: { contentId: params.contentId}
    })
    return {content, quotes}
}

export default function AuthorDetail() {
    const data = useLoaderData()
    const content = data.content
    console.log(data)
    return (
        <div>
            <h2 className="text-stone-300/60 text-xl font-bold">{data.content.title} Quotes</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.quotes.map((quote: any) => (
                <Link to={`/quotes/${quote.id}`} key={quote.id}>
                    <div className="p-4 mb-6 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400">
                        <p className="text-xl text-center pb-6 italic font-semibold">"{quote.body}"</p>
                        <p className="font-light"><Link to={`/authors/${quote.authorId}`}>{quote.authorName}</Link>, <span className="font-thin"><Link to={`/content/${quote.contentId}`}>{content.title}</Link></span></p>
                    </div>
                </Link>
            ))}
            </div>
        </div>
    )
}