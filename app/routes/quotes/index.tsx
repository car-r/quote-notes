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
        where: {userId: userId}
        }
    )
    const authors = await prisma.author.findMany()

    const groupQuotes = await prisma.quote.groupBy({
        where: {userId: userId},
        by: ['authorName'],
        _count: {_all: true}
      })
    return {quotes, authors, groupQuotes}
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
                {quoteCountList.length > 0 ? 
                <div className="pb-20 pt-10 w-full flex flex-col overflow-hidden">
                    <Bar
                        data={barData}
                    />
                </div>
                :
                null
                }
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <AddQuoteCard />
                    {data.quotes.map((quote: any) => (
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