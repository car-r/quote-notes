import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import PageTitle from "~/components/PageTitle";
import QuoteIndexCard from "~/components/QuoteIndexCard";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

import AddQuoteBtn from "~/components/Buttons/AddQuoteBtn";
import FirstQuoteBtn from "~/components/Buttons/FirstQuoteBtn"
import QuoteErrorBackBtn from "~/components/Buttons/QuoteErrorBackBtn";

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
            author: true,
            book: true,
          }
        }
    )


    // const authors = await prisma.author.findMany({
    //     where: {userId: userId},
    //     include: {
    //         quote: true, // Return all fields
    //     }
    // })


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

    // const tags = await prisma.tag.findMany({
    //     where: {userId: userId}
    // })


    const tagsWithQuotes = await prisma.tag.findMany({
        where: {userId: userId},
        include: {
            quote: true, // Return all fields
        }
        
    })

    return {quotes, tags, tagsWithQuotes}
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

    console.log(data)
    return (
        <>
            <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
                {qouteCount > 0 ?
                    <PageTitle children={`${qouteCount} Quotes`} btn={<AddQuoteBtn />}/>
                    :
                    <PageTitle children={`Quotes`} btn={<FirstQuoteBtn />}/>
                }
                <div className="flex gap-4 pb-6 mb-6 overflow-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                        <div className="items-center flex text-xs font-semibold px-4 py-2 rounded-xl  whitespace-nowrap cursor-pointer bg-stone-300 text-stone-800">
                            <p  className="">
                                all
                            </p>
                        </div>
                    {data.tags.map((tag: any) => (
                        <Link to={`/quotes/tags/${tag.body}`} key={tag.id}>
                            <div className="items-center flex text-xs font-semibold px-4 py-2 rounded-xl  whitespace-nowrap cursor-pointer bg-stone-800 hover:bg-stone-700">
                                <p  className="">{tag.body}</p>
                                {/* <p>{tag.id}</p> */}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-1">
                    {data.quotes.map((quote: any) => (
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

