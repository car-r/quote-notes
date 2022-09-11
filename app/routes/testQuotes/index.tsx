import { Link, useLoaderData } from "@remix-run/react";
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

export const loader = async ({request}: any) => {
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

    return {quotes, authors, groupQuotes, tags, tagsWithQuotes}
}

export const action = async ({request}: any) => {
    const form = await request.formData()
    const id = form.get('id')
    const isFavorited = form.get('isFavorited')
    console.log(id + isFavorited)

    await prisma.quote.update({
        where: { id: id },
        data: { isFavorited: isFavorited }
    })
    return redirect('/quotes')
}

export default function QuotesIndex() {
    const data = useLoaderData()
    const quotes = data.quotes
    const qouteCount = data.quotes.length
    const authorList = data.groupQuotes.map((author: any) => (author.authorName))
    const quoteCountList = data.groupQuotes.map((quote: any) => (quote._count._all))
    const [tags, setTags] = useState<string[]>(['all'])
    // const [filteredQuotes, setFilteredQuotes] = useState([])
    
    // function aggregateTags(prevTags) {
    //     setTags(prevTags => [...prevTags, tag.body])
    // }

    // const filterQuotes = (tags: any) => data.quotes.filter((quote: any) => 
    //     // quote.tag.some(tag => tags.includes(tag.body))
    //     quote.tag.some((tag: any) => tags.includes(tag.body))
    // )
    // console.log('filter quotes --> ', filterQuotes(tags))

    // useEffect(() => {
    //     // function to run to filter the quotes when tags state updates
    //     filterQuotes(tags)
    // }, [tags]) // FIX React Hook useEffect has a missing dependency: 'filterQuotes'. Either include it or remove the dependency array.

    // const filteredQuotes = filterQuotes(tags)

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
    console.log(tags)
    return (
        <>
            <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
                {qouteCount > 0 ?
                    <PageTitle children={`${qouteCount} Quotes`}/>
                    :
                    <PageTitle children={`Quotes`}/>
                }
                <div className="flex gap-4 pb-6 mb-6 overflow-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                        <div className="items-center flex text-xs text-stone-300 font-thin  px-4 py-2 rounded-xl bg-stone-800 whitespace-nowrap cursor-pointer"
                            onClick={() => setTags(['all'])}
                        >
                            <p  className="">
                                all
                            </p>
                        </div>
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
                    <AddQuoteCard />
                    {data.quotes.map((quote: any) => (
                            <div key={quote.id}>
                                {/* <QuoteIndexCard quote={quote} />    */}
                                <div className="p-4 rounded-lg bg-stone-800">
                                    {quote.body}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}