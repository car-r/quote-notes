import { useCatch, useLoaderData, useOutletContext, useParams } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import QuoteCardTagId from "~/components/QuoteCardTagId";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import type { Quote } from "@prisma/client";

export type Tag = {
    body: string;
    bookId: string;
    id: string;
    quote: {
        body: string
        isFavorited: string
    }

}

export const loader = async ({request, params}: any) => {
    const userId = await requireUserId(request);

    const taggedQuotes = await prisma.tag.findMany({
        where: {body: params.tagId, userId: userId},
        include: {
            quote: {
                select: {
                    body: true,
                    author: true,
                    authorId: true,
                    book: true,
                    isFavorited: true,
                }
            }
        },
    })

    // throw error if there are no quotes with the tag in params
    if (taggedQuotes.length < 1) {
        throw new Response("Can't find tag.", {
            status: 404,
        })
    }

    return {taggedQuotes}
    
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
    
    return redirect(`/quotes/tags/${params.tagId}`)
}

export default function QuotesIndex() {
    const data = useLoaderData()
    const [search]: string = useOutletContext()
    console.log('taggedQuotes data',data)
    console.log('search outlet-> ', search)

    const filteredSearch = data.taggedQuotes.filter((quote: Tag) =>
        quote.quote.body.toLowerCase().includes(search.toLowerCase())
    )
    console.log('$tagId route --> ', data)

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* {data.taggedQuotes.map((quote: any) => (
                    <QuoteCardTagId quote={quote} key={quote.id}/>
                ))} */}
                {filteredSearch.map((quote: Quote) => (
                    <QuoteCardTagId quote={quote} key={quote.id}/>
                ))}
            </div>
        </>
    )
}

export function CatchBoundary() {
    const caught = useCatch();
    const params = useParams();
    if (caught.status === 404) {
      return (
        <div className="flex flex-col  md:max-w-5xl pb-6">
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="flex flex-col col-span-2 pb-4 md:pr-4">
                    <div className='flex flex-col justify-center p-10 border border-red-500 text-red-500 rounded-sm text-center w-full'>
                        <p className="font-semibold tracking-wide">{`Can't find tag '${params.tagId}'`}</p>
                    </div>
                </div>
            </div>
        </div>
      );
    }
    throw new Error(`Unhandled error: ${caught.status}`)
}