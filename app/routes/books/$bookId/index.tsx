import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { Form, Link, useLoaderData } from "@remix-run/react";
import BookIdCard from "~/components/BookIdCard";
import { json, redirect } from "@remix-run/server-runtime";



export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);

    // const data = await prisma.book.findUnique({
    //     where: {id: params.bookId},
    //     include: {
    //         author: true
    //     }
    // })

    // if (!data) {
    //     throw new Response("Can't find book.", {
    //         status: 404,
    //     })
    // }

    const data = await prisma.book.findUnique({
        where: { id: params.bookId },
        include: {
            author: true,
            tag: true,
            quote: {
                where: {userId: userId},
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ]
            }
        }
    })
    if (!data) {
        throw new Response("Can't find book.", {
            status: 404,
        })
    }


    // const response = await fetch(`https://openlibrary.org/isbn/${data.ISBN}.json`)
    // const res = await response.json()
        // .then((response) => response.json())
        // .then((response) => console.log('loader response -> ', response))


    

    // const data = await prisma.user.findUnique({
    //     where: { id: userId },
    //     include: {
    //         _count: {
    //           select: {

    //             book: true,
    //             quoteNote: true
    //           }
    //         },
    //         book: {
    //             where: { id: params.bookId},
    //             include: {
    //                 author: true,
    //             }
    //         }
    //       }
    // })

    return {data}
}

export const action = async ({request}: any) => {
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
        return redirect(`/books/${bookId}`)
    }



    // Action to update if Quote is favorited
    if (form.get('_method') !== 'create') {
        await prisma.quote.update({
            where: { id: id },
            data: { isFavorited: isFavorited }
        })
            return redirect(`/books/${bookId}`)
    }
}

export default function BookIdHome() {
    const data = useLoaderData()
    const book = data.data
    console.log('bookId index --> ', data)
    return (
        <div>
            {/* <BookIdCard data={data}/> */}
            {book.quote.length < 1 ? 
                    <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-1 lg:grid-cols-2 pb-1">
                        <div className="flex flex-col h-32 justify-center p-4 outline-dashed border border-stone-800 bg-stone-800 rounded-md lg:w-96 ">
                            <p className="text-center">Add your first quote</p>
                        </div>
                    </div> 
                    : 
                    <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-1 md:grid-flow-row md:auto-rows-max lg:grid-cols-2 pb-1">
                        {book.quote.map((quote: any) => (
                            <div key={quote.id} className="flex flex-col p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:ring-2 hover:ring-blue-400 hover:text-stone-100 min-w-[165px]">
                                <div className="flex flex-col min-h-full">
                                    <Form method="post">
                                        <div onClick={() => console.log('clicked')} className="flex justify-end ">   
                                            <div className="flex flex-col">
                                            <input type="hidden" name="id" value={quote.id}/>
                                            <input type="hidden" name="bookId" value={quote.bookId}/>
                                            {quote.isFavorited === "isFavorited" ? <input type="hidden" name="isFavorited" value="notFavorited"/> : <input type="hidden" name="isFavorited" value="isFavorited"/>}
                                                <button type="submit">
                                                    {quote.isFavorited === "isFavorited" ? 
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
                                    <Link to={`/quotes/${quote.id}`} className="flex flex-col flex-1 justify-center py-4 px-5">
                                        <div className=" ">
                                            <p className="text-base text-center italic font-semibold">"{quote.body}"</p>
                                        </div>
                                    </Link>
                                </div>
                            </div> 
                        ))}
                    </div>
                }
        </div>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <div className='flex flex-col max-w-xl justify-center py-10 px-6  border border-red-500 text-red-500 rounded-lg text-center'>
                <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
            </div>
        </div>
    );
}