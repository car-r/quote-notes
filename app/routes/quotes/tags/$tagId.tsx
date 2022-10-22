import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import QuoteCardTagId from "~/components/QuoteCardTagId";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

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

    return {quotes, groupQuotes, tags, tagsWithQuotes, taggedQuotes}
    
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

    console.log('$tagId route --> ', data)

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.taggedQuotes.map((quote: any) => (
                    <QuoteCardTagId quote={quote} key={quote.id}/>
                ))}
            </div>
        </>
    )
}