import { Form, Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/server-runtime";
import { useState } from "react";
import AddQuoteCard from "~/components/AddQuoteCard";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const quotes = await prisma.quote.findMany(
        {orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        where: {userId: userId}
        }
    )
    const authors = await prisma.author.findMany()
    return {quotes, authors}
}

export const action = async ({request}: any) => {
    const form = await request.formData()
    const id = form.get('id')
    const isFavorited = form.get('isFavorited')
    // const stringIsFavorited = form.get('isFavorited')
    // const isFavorited = JSON.parse(stringIsFavorited)
    console.log(id + isFavorited)

    const quote = await prisma.quote.update({
        where: { id: id },
        data: { isFavorited: isFavorited }
    })
    return redirect('/quotes')
}

export default function QuotesIndex() {

    const data = useLoaderData()

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
                        <div key={quote.id}
                            className="flex flex-col p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400"
                        >   
                            <div className="flex-1">
                                <Form method="post">
                                    <div onClick={() => console.log('clicked')} className="flex justify-end mb-1">   
                                        <div className="flex flex-col">
                                        <input type="hidden" name="id" value={quote.id}/>
                                        {/* <input type="hidden" name="isFavorited" value={!quote.isFavorited}/> */}
                                        {quote.isFavorited === "isFavorited" ? <input type="hidden" name="isFavorited" value="notFavorited"/> : <input type="hidden" name="isFavorited" value="isFavorited"/>}
                                        {/* <input type="checkbox" name="isFavorited" /> */}
                                            <button type="submit" className="">
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
                                <Link to={`/quotes/${quote.id}`}>
                                    <div className="flex flex-col h-5/6 justify-center">
                                        <p className="text-xl text-center pb-6 italic font-semibold">"{quote.body}"</p>
                                        <p className="font-light mt-auto"><Link to={`/authors/${quote.authorId}`}>{quote.authorName}</Link></p>
                                    </div>
                                </Link>
                            </div>
                        </div>))
                    }
                </div>
            </div>
            
           
        </>
        
    )
}