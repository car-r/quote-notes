import { useLoaderData } from "@remix-run/react";
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
import { useState } from "react";
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
                createdAt: 'desc',
            },
        ],
        where: {userId: userId},
        include: {
            tag: true, // Return all fields
          }
        }
    )
    const authors = await prisma.author.findMany()

    const groupQuotes = await prisma.quote.groupBy({
        where: {userId: userId},
        by: ['authorName'],
        _count: {_all: true}
    })

    const tags = await prisma.tag.findMany()

    return {quotes, authors, groupQuotes, tags}
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
    const qouteCount = data.quotes.length
    const authorList = data.groupQuotes.map((author: any) => (author.authorName))
    const quoteCountList = data.groupQuotes.map((quote: any) => (quote._count._all))
    const [tags, setTags] = useState('')

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
                {/* {quoteCountList.length > 0 ? 
                <div className="pb-20 pt-10 w-full flex flex-col overflow-hidden">
                    <Bar
                        data={barData}
                    />
                </div>
                :
                null
                } */}
                <div className="flex gap-4 pb-6 overflow-auto">
                        <div className="items-center flex text-xs text-stone-300 font-thin  px-4 py-2 rounded-xl bg-stone-800 whitespace-nowrap"
                            onClick={() => setTags(``)}
                        >
                            <p  className="">
                                all
                            </p>
                        </div>
                    {data.tags.map((tag: any) => (
                        <div key={tag.id} className="items-center flex text-xs text-stone-300 font-thin  px-4 py-2 rounded-xl bg-stone-800 whitespace-nowrap"
                            onClick={() => setTags(tag.body)}
                        >
                            <p  className="">
                                <span>
                                    {tag.body}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <AddQuoteCard />
                    {data.quotes.filter((quote: any) => quote.tag.body !== tags).map((quote: any) => (
                        <div key={quote.id}>
                            <QuoteIndexCard quote={quote} />
                        </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}