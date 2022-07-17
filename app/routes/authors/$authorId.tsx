import { useLoaderData, Link, useParams } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import { useState } from "react"
import AuthorRouteAuthorCard from "~/components/AuthorRouteAuthorCard"
import PageTitle from "~/components/PageTitle"
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const author = await prisma.author.findUnique({
        where: { id: params.authorId }
    })
    const quotes = await prisma.quote.findMany({
        where: { authorId: params.authorId }
    })
    const favoriteQuotes = await prisma.quote.findMany({
        where: { authorId: params.authorId, isFavorited: {equals: "isFavorited"} }
    })
    const content = await prisma.content.findMany({
        where: { authorId: params.authorId}
    })
    const quoteNotes = await prisma.quoteNote.findMany({
        where: { authorId: params.authorId}
    })
    return {author, quotes, favoriteQuotes, content, quoteNotes}
}

export const action = async ({request, params}: any) => {
    const form = await request.formData()
    const name = form.get('name')
    const imgUrl = form.get('imgUrl')
    const userId = 'cl5j0h3ey00090bmf1xn3f4vo'

    const fields = { name, imgUrl, userId }

    if(form.get('_method') === 'delete') {
        await prisma.author.delete({ where: { id: params.authorId}})
        return redirect('/authors')
    }

    const author = await prisma.author.update({where: {id: params.authorId}, data: fields})
    return redirect(`/authors`)
}

export default function AuthorDetail() {
    const data = useLoaderData()
    console.log(data)
    const quotes = data.favoriteQuotes
    const content = data.content
    return (
        <div className="flex flex-col pt-10 max-w-4xl">
            <PageTitle children={data.author.name}/>
            {/* <div className="pb-6">
                <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    {data.author.name}
                </h3>
            </div> */}
            <AuthorRouteAuthorCard author={data} />
            <div className="mb-8">
                <div className="py-6">
                    <h3 className="text-xl tracking-wide font-semibold">
                        Content
                    </h3>
                </div>
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
                <div className="py-6">
                    <h3 className="text-xl tracking-wide font-semibold">
                        Favorite Quotes
                    </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.quotes.map((quote: any) => (
                        <Link to={`/quotes/${quote.id}`} key={quote.id}>
                            <div className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400">
                                <p className="text-xl text-center italic font-semibold">"{quote.body}"</p>
                            </div>
                        </Link>
                    ))}
                </div>   
            </div> 
        </div>

    )
}