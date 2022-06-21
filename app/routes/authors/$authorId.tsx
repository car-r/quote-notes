import { useLoaderData, Link } from "@remix-run/react"
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const author = await prisma.author.findUnique({
        where: { id: params.authorId }
    })
    const quotes = await prisma.quote.findMany({
        where: { authorId: params.authorId}
    })
    const content = await prisma.content.findMany({
        where: { authorId: params.authorId}
    })
    return {author, quotes, content}
}

export default function AuthorDetail() {
    const data = useLoaderData()
    console.log(data)
    const quotes = data.quotes
    const content = data.content
    return (
        <div className="flex flex-col pt-10">
            <h3 className="text-xl pb-6">{data.author.name}</h3>
            <div className="mb-8">
                <h4 className="font-bold tracking-wider mb-2">Content</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                {data.content.map((content: any) => (
                    <Link to={`/content/${content.id}`} key={content.id}
                    className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400"
                    >
                        <div className="pb-2">
                            <img src={content.imgUrl} alt={content.title} 
                                className="object-fit max-w-96"
                            />
                        </div>
                        <div>
                            <p className="font-bold">
                                {content.title}
                            </p>     
                            <p className="text-sm font-thin tracking-wider">
                                {content.authorName}
                            </p>               
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex flex-col">
                <h4 className="font-bold tracking-wider mb-2">Quotes</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.quotes.map((quote: any) => (
                        <Link to={`/quotes/${quote.id}`} key={quote.id}>
                            <div className="p-4 mb-6 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400">
                                <p className="text-xl text-center pb-6 italic font-semibold">"{quote.body}"</p>
                            </div>
                        </Link>
                    ))}
                </div>   
            </div> 
        </div>
    )
}