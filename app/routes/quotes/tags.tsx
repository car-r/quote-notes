import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
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
import AddQuoteBtn from "~/components/AddQuoteBtn";
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

    const qouteCount = data.quotes.length
    const authorList = data.groupQuotes.map((author: any) => (author.authorName))
    const quoteCountList = data.groupQuotes.map((quote: any) => (quote._count._all))
    const [tags, setTags] = useState<string[]>(['all'])

    console.log(data)
    console.log(tags)
    return (
        <>
            <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
                {qouteCount > 0 ?
                    <PageTitle children={`${qouteCount} Quotes`} btn={<AddQuoteBtn />}/>
                    :
                    <PageTitle children={`Quotes`} btn={<AddQuoteBtn />}/>
                }
                <div className="flex gap-4 pb-6 mb-6 overflow-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                        <Link to="/quotes">
                            <div className="items-center flex text-xs text-stone-300 font-thin  px-4 py-2 rounded-xl bg-stone-800 whitespace-nowrap cursor-pointer"
                            >
                                all
                            </div>
                        </Link>
                    {data.tags.map((tag: any) => (
                        <NavLink to={`/quotes/tags/${tag.body}`} key={tag.id} className={({ isActive }) =>
                        ` ${isActive ? "bg-stone-600 items-center flex text-xs text-stone-300 font-thin  px-4 py-2 rounded-xl  whitespace-nowrap cursor-pointer" : "items-center flex text-xs text-stone-300 font-thin  px-4 py-2 rounded-xl bg-stone-800 whitespace-nowrap cursor-pointer"}`
                        }>
                            <div key={tag.id} >
                                <p  className="">{tag.body}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
                <div className="">
                    <Outlet />
                </div>
            </div>
        </>
    )
}