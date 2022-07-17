import { Form, Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/server-runtime";
import { useState } from "react";
import AddQuoteCard from "~/components/AddQuoteCard";
import PageTitle from "~/components/PageTitle";
import QuoteIndexCard from "~/components/QuoteIndexCard";

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
                <PageTitle children={`Your Quotes`}/>
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