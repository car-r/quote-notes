import { Form, Link, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async ({request, params}: any) => {
    const userId = await requireUserId(request);
    

    const taggedQuotes = await prisma.tag.findMany({
        where: {body: params.tagId, bookId: params.bookId },
        include: {
            quote: {
                select: {
                    body: true,
                    author: true,
                    authorId: true,
                    book: true,
                    isFavorited: true,
                }
            }
        },
    })

    // throw error if there are no quotes with the tag in params
    if (taggedQuotes.length < 1) {
        throw new Response("Can't find tag.", {
            status: 404,
        })
    }

    return {taggedQuotes}
    
}

export const action = async ({request, params}: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const authorId = form.get('authorId')
    // const selectAuthorId = form.get('selectAuthorId')
    const body = form.get('body')
    const bookId = form.get('bookId')
    const authorName = form.get('authorName')
    const id = form.get('id')
    const isFavorited = form.get('isFavorited')
    // const title = form.get('title')
    // const imgUrl = form.get('imgUrl')
    // const selectAuthorName = form.get('selectAuthorName')
    console.log(Object.fromEntries(form))


    // Action to create Quote
    if(form.get('_method') === 'create') {
        const errors = {
            body: '',
        }

        function checkBody(body: any) {
            if(!body || body.length < 4) {
                return errors.body = `Quote too short`
            }
        }
    
        checkBody(body)

        if (errors.body) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = { authorId, body, userId, bookId, authorName }
        await prisma.quote.create({ data: fields})
        return redirect(`/books/${bookId}/${params.tagId}`)
    }



    // Action to update if Quote is favorited
    if (form.get('_method') !== 'create') {
        await prisma.quote.update({
            where: { id: id },
            data: { isFavorited: isFavorited }
        })
            return redirect(`/books/${bookId}/tags/${params.tagId}`)
    }
}

export default function BookTagId() {
    const data = useLoaderData()
    console.log('book tagId -> ', data)
    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-1 md:grid-flow-row md:auto-rows-max lg:grid-cols-2 pb-1">
            {data.taggedQuotes?.map((quote: any) => (
                <div key={quote.id} className="flex flex-col p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:ring-2 hover:ring-blue-400 hover:text-stone-100 min-w-[165px]">
                    <div className="flex flex-col min-h-full">
                        <Form method="post">
                            <div onClick={() => console.log('clicked')} className="flex justify-end ">   
                                <div className="flex flex-col">
                                <input type="hidden" name="id" value={quote.quoteId}/>
                                <input type="hidden" name="bookId" value={quote.bookId}/>
                                {quote.quote.isFavorited === "isFavorited" ? <input type="hidden" name="isFavorited" value="notFavorited"/> : <input type="hidden" name="isFavorited" value="isFavorited"/>}
                                    <button type="submit">
                                        {quote.quote.isFavorited === "isFavorited" ? 
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-right" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        }
                                    </button>
                                </div>
                            </div>
                        </Form>
                        <Link to={`/quotes/${quote.quoteId}`} className="flex flex-col flex-1 justify-center py-4 px-5">
                            <div className=" ">
                                <p className="text-lg text-center italic font-semibold">"{quote.quote.body}"</p>
                            </div>
                        </Link>
                    </div>
                </div> 
            ))}
        </div>
    )
}