import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/server-runtime";
import PageTitle from "~/components/PageTitle";
import QuoteIndexCard from "~/components/QuoteIndexCard";
import type { Quote, Tag } from "@prisma/client";
// import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

import AddQuoteBtn from "~/components/Buttons/AddQuoteBtn";
import FirstQuoteBtn from "~/components/Buttons/FirstQuoteBtn"
import QuoteErrorBackBtn from "~/components/Buttons/QuoteErrorBackBtn";
import { useState } from "react";
import { getSortedQuotes, updateQuoteFavorite } from "~/models/quote.server";
import { getTagsByGroup, getTagsWithQuotes } from "~/models/tag.server";

export const loader: LoaderFunction = async ({request}) => {
    const userId = await requireUserId(request);
    // const quotes = await prisma.quote.findMany(
    //     {orderBy: [
    //         {
    //             note: {
    //                 _count: 'desc'
    //             }
    //         },
    //         {
    //             createdAt: 'desc',
    //         },
    //     ],
    //     where: {userId: userId},
    //     include: {
    //         tag: true, // Return all fields
    //         author: true,
    //         book: true,
    //       }
    //     }
    // )

    const quotes = await getSortedQuotes({userId})


    // const authors = await prisma.author.findMany({
    //     where: {userId: userId},
    //     include: {
    //         quote: true, // Return all fields
    //     }
    // })


    // const tags = await prisma.tag.groupBy({
    //     where: {userId: userId},
    //     by: ['body'],
    //     _count: true,
    //     orderBy: [{
    //         _count: {
    //             quoteId: 'desc'
    //         }
    //     }]
    // })

    const tags = await getTagsByGroup({userId})

    // const tags = await prisma.tag.findMany({
    //     where: {userId: userId}
    // })


    // const tagsWithQuotes = await prisma.tag.findMany({
    //     where: {userId: userId},
    //     include: {
    //         quote: true, // Return all fields
    //     }
        
    // })

    const tagsWithQuotes = await getTagsWithQuotes({ userId })

    return {quotes, tags, tagsWithQuotes}
}

export const action: ActionFunction = async ({request}) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const id = form.get('id') as string
    const isFavorited = form.get('isFavorited') as string
    // console.log(id + isFavorited)

    // await prisma.quote.update({
    //     where: { id: id },
    //     data: { isFavorited: isFavorited }
    // })

    await updateQuoteFavorite({ userId, id, isFavorited})
    return redirect('/quotes')
}

export default function QuotesIndex() {
    const data = useLoaderData()
    const qouteCount = data.quotes.length
    const [search, setSearch] = useState('')

    // console.log('search state ->', search)
    const filteredSearch = data.quotes.filter((quote: Quote) =>
        quote.body.toLowerCase().includes(search.toLowerCase())
    )

    // function filterSearch(e) {
    //     data.quotes.filter((quote) => {
    //         quote.body.toLowerCase().includes(e.toLowerCase())
    //     })
    // }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }
    console.log('search state 2->', search)

    console.log(data)
    return (
        <>
            <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
                {qouteCount > 0 ?
                    <PageTitle children={`${qouteCount} Quotes`} btn={<AddQuoteBtn />}/>
                    :
                    <PageTitle children={`Quotes`} btn={<FirstQuoteBtn />}/>
                }
                <div className="flex flex-col gap-6  md:flex-row">
                    <div className="flex gap-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mt-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input 
                            type="text" 
                            onChange={(e) => handleChange(e)}
                            placeholder="search quotes"
                            className="px-2 py-1 w-full md:w-52  border border-stone-700 bg-stone-700 rounded-xl h-8"
                        />
                    </div>
                    <div className="flex gap-4 pb-6 mb-6 overflow-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                        <div className="items-center flex text-xs font-semibold px-4 py-2 rounded-xl  whitespace-nowrap cursor-pointer bg-stone-300 text-stone-800">
                            <p  className="">
                                all
                            </p>
                        </div>
                        {data.tags.map((tag: Tag) => (
                            <Link to={`/quotes/tags/${tag.body}`} key={tag.id}>
                                <div className="items-center flex text-xs font-semibold px-4 py-2 rounded-xl  whitespace-nowrap cursor-pointer bg-stone-800 hover:bg-stone-700">
                                    <p  className="">{tag.body}</p>
                                    {/* <p>{tag.id}</p> */}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-1">
                    {/* {data.quotes.map((quote: any) => (
                        <QuoteIndexCard quote={quote} key={quote.id}/>
                    ))} */}
                    {filteredSearch.map((quote: Quote) => (
                        <QuoteIndexCard quote={quote} key={quote.id}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`Book`} btn={<QuoteErrorBackBtn />}/>
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="flex flex-col col-span-2 ">
                    <div className='flex flex-col justify-center py-10 border border-red-500 text-red-500 rounded-lg text-center w-full'>
                        <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

