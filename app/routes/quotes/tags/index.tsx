import { redirect } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getSortedQuotes, updateQuoteFavorite } from "~/models/quote.server";
import { requireUserId } from "~/session.server";
// import type { Quote } from "@prisma/client";
import QuoteIndexCard from "~/components/QuoteIndexCard";
// import { useContext, useState } from "react";

export const loader: LoaderFunction = async ({request}) => {
    const userId = await requireUserId(request);
    const quotes = await getSortedQuotes({userId})

    return {quotes}
}

export const action: ActionFunction = async ({request}) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const id = form.get('id') as string
    const isFavorited = form.get('isFavorited') as string

    await updateQuoteFavorite({ userId, id, isFavorited})
    return redirect('/quotes')
}

export type Quote = {
    body: string
}

export type QuoteIndexType = {
    id: string
    isFavorited: string
    body: string
    author: {
        name: string
        id: string
    }
    book: {
        id: string
        title: string
    }
}

export default function TagsIndex() {
    const data = useLoaderData()
    const [search]: string = useOutletContext()
    console.log('tagsIndex',data)
    console.log('search outlet-> ', search)

    const filteredSearch = data.quotes.filter((quote: Quote) =>
        quote.body.toLowerCase().includes(search.toLowerCase())
    )
    
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-1">
            {filteredSearch.map((quote: QuoteIndexType) => (
                <QuoteIndexCard quote={quote} key={quote.id}/>
            ))}
        </div>
    )
}