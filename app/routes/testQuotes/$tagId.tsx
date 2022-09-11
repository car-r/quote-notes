import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import AddQuoteCard from "~/components/AddQuoteCard";
import PageTitle from "~/components/PageTitle";
import QuoteIndexCard from "~/components/QuoteIndexCard";

import { prisma } from "~/db.server";
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
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import SectionTitle from "~/components/SectionTitle";
import AuthorCard from "~/components/AuthorCard";
import QuoteIndexSmallCard from "~/components/QuoteIndexSmallCard";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const loader = async ({request, params}: any) => {
    const userId = await requireUserId(request);
    const quotes = await prisma.quote.findMany(
        {orderBy: [
            {
                note: {
                    _count: 'desc'
                }
            },
            {
                createdAt: 'desc',
            },
        ],
        where: {userId: userId},
        include: {
            tag: true, // Return all fields
          }
        }
    )

    const taggedQuotes = await prisma.tag.findMany({
        where: {body: params.tagId},
        include: {
            quote: true,
        }
    })

    const authors = await prisma.author.findMany({
        where: {userId: userId},
        include: {
            quote: true, // Return all fields
        }
    })


    const groupQuotes = await prisma.quote.groupBy({
        where: {userId: userId},
        by: ['authorName'],
        _count: {_all: true},
    })


    const tags = await prisma.tag.groupBy({
        where: {userId: userId},
        by: ['body'],
        _count: true,
        orderBy: [{
            _count: {
                quoteId: 'desc'
            }
        }]
    })


    const tagsWithQuotes = await prisma.tag.findMany({
        where: {userId: userId},
        include: {
            quote: true, // Return all fields
        }
        
    })

    return {quotes, authors, groupQuotes, tags, tagsWithQuotes, taggedQuotes}
}

export const action = async ({request, params}: any) => {
    const form = await request.formData()
    const id = form.get('id')
    const isFavorited = form.get('isFavorited')
    console.log(id + isFavorited)

    await prisma.quote.update({
        where: { id: id },
        data: { isFavorited: isFavorited }
    })
    return redirect(`/testQuotes/${params.tagId}`)
}

export default function QuotesIndex() {
    const data = useLoaderData()
    const quotes = data.quotes
    const qouteCount = data.quotes.length
    const authorList = data.groupQuotes.map((author: any) => (author.authorName))
    const quoteCountList = data.groupQuotes.map((quote: any) => (quote._count._all))


    const barData = {
        labels: authorList,
        datasets: [{label: 'Quotes By Author',
          data: quoteCountList,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1,
          maxBarThickness: 75
        }]
    }
    console.log(data)

    return (
        <>
            <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
                {qouteCount > 0 ?
                    <PageTitle children={`${qouteCount} Quotes`}/>
                    :
                    <PageTitle children={`Quotes`}/>
                }
                <div className="flex gap-4 pb-6 mb-6 overflow-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                        <Link to='/testQuotes'>
                        <div className="items-center flex text-xs text-stone-300 font-thin  px-4 py-2 rounded-xl bg-stone-800 whitespace-nowrap cursor-pointer">
                            <p  className="">
                                all
                            </p>
                        </div>
                        </Link>
                    {data.tags.map((tag: any) => (
                        <Link to={`/testQuotes/${tag.body}`} key={tag.id}>
                            <div key={tag.id} className="items-center flex text-xs text-stone-300 font-thin  px-4 py-2 rounded-xl bg-stone-800 whitespace-nowrap cursor-pointer">
                                <p  className="">{tag.body}</p>
                                <p>{tag.id}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* <AddQuoteCard /> */}
                    {/* <Outlet /> */}
                    {data.taggedQuotes.map((quote: any) => (
                            <div key={quote.id} >
                                <div className="p-4  border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
                                    <div className="flex flex-col min-h-full">
                                    <Form method="post">
                                        <div onClick={() => console.log('clicked')} className="flex justify-end mb-2">   
                                            <div className="flex flex-col">
                                            <input type="hidden" name="id" value={quote.quote.id}/>

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
                                    <Link to={`/quotes/${quote.quote.id}`} className="flex flex-col flex-1 min-h-full justify-center mb-6">
                                        <div className=" ">
                                                <p className="text-lg md:text-xl text-center italic font-semibold">"{quote.quote.body}"</p>
                                        </div>
                                    </Link>
                                    <div className="flex mt-auto">
                                        <p className="text-sm md:text-base font-light tracking-wide">
                                            <Link to={`/authors/${quote.quote.authorId}`}>{quote.quote.authorName}</Link>
                                        </p>
                                    </div>
                                    </div>

                                </div>  
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}