import { NavLink, Outlet, useLoaderData, useParams } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/server-runtime";
// import AddQuoteCard from "~/components/AddQuoteCard";
import PageTitle from "~/components/PageTitle";
// import QuoteIndexCard from "~/components/QuoteIndexCard";
import type { Tag } from "@prisma/client";

// import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
import { useState } from "react";
// import SectionTitle from "~/components/SectionTitle";
// import AuthorCard from "~/components/AuthorCard";
// import QuoteIndexSmallCard from "~/components/QuoteIndexSmallCard";
import AddQuoteBtn from "~/components/Buttons/AddQuoteBtn";
import { getSortedQuotes, updateQuoteFavorite } from "~/models/quote.server";
import { getTagsByGroup } from "~/models/tag.server";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const loader: LoaderFunction = async ({request}) => {
    const userId = await requireUserId(request);
    const quotes = await getSortedQuotes({ userId })
    const tags = await getTagsByGroup({userId})

    // const authors = await prisma.author.findMany({
    //     where: {userId: userId},
    //     include: {
    //         quote: true, // Return all fields
    //     }
    // })

    // const groupQuotes = await prisma.quote.groupBy({
    //     where: {userId: userId},
    //     by: ['authorName'],
    //     _count: {_all: true},
    // })

    // const tagsWithQuotes = await prisma.tag.findMany({
    //     where: {userId: userId},
    //     include: {
    //         quote: true, // Return all fields
    //     } 
    // })

    // return {quotes, authors, groupQuotes, tags, tagsWithQuotes}
    return {quotes, tags}
}

export const action: ActionFunction = async ({request}) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const id = form.get('id') as string
    const isFavorited = form.get('isFavorited') as string
    // console.log(id + isFavorited)

    await updateQuoteFavorite({ userId, id, isFavorited})

    return redirect('/quotes')
}

export default function QuotesIndex() {
    const params = useParams()
    // console.log('tags params -> ', params)
    // console.log('params empty', Object.keys(params).length)
    
    const data = useLoaderData()
    const [search, setSearch] = useState('')

   console.log('tags search state ->', search)
    

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        console.log('tags search state ->', search)
    }

    const qouteCount = data.quotes.length
    // const authorList = data.groupQuotes.map((author: any) => (author.authorName))
    // const quoteCountList = data.groupQuotes.map((quote: any) => (quote._count._all))
    // const [tags, setTags] = useState<string[]>(['all'])

    // console.log(data)
    // console.log(tags)
    return (
        <>
            <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
                {qouteCount > 0 ?
                    <PageTitle children={`${qouteCount} Quotes`} btn={<AddQuoteBtn />}/>
                    :
                    <PageTitle children={`Quotes`} btn={<AddQuoteBtn />}/>
                }
                <div className="flex flex-col gap-6  md:flex-row">
                    <div className="flex gap-2 h-8 ">
                        <label htmlFor="search" className="flex bg-stone-700 rounded-xl pl-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mt-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <input 
                                type="text" 
                                onChange={(e) => handleChange(e)}
                                placeholder="search quotes"
                                className="px-2 py-1 w-full md:w-52  border border-stone-700 bg-stone-700 rounded-xl h-8 "
                            />
                        </label>
                    </div>
                    <div className="flex gap-4 pb-6 mb-6 overflow-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                        <NavLink to={`/quotes/tags`}  className={({ isActive }) =>
                        ` items-center flex text-xs font-semibold px-4 py-2 rounded-xl  whitespace-nowrap cursor-pointer bg-stone-800 hover:bg-stone-700 ${isActive && Object.keys(params).length < 1 ? "bg-stone-300 text-stone-800 hover:bg-stone-300 " : ""}`
                        }>
                            <div>
                                all
                            </div>
                        </NavLink>
                        {data.tags.map((tag: Tag) => (
                            <NavLink to={`/quotes/tags/${tag.body}`} key={tag.body} className={({ isActive }) =>
                            ` items-center flex text-xs font-semibold px-4 py-2 rounded-xl  whitespace-nowrap cursor-pointer bg-stone-800 hover:bg-stone-700 ${isActive ? "bg-stone-300 text-stone-800 hover:bg-stone-300 " : ""}`
                            }>
                                <div key={tag.id} >
                                    <p  className="">{tag.body}</p>
                                    <p>{tag.id}</p>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="">
                    <Outlet context={[search, setSearch]}/>
                </div>
            </div>
        </>
    )
}