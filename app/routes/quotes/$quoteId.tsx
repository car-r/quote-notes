import { Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import EditQuoteBtn from "~/components/Buttons/EditQuoteBtn";
import PageTitle from "~/components/PageTitle";
import QuoteBackBtn from "~/components/Buttons/QuoteBackBtn";
import QuoteNoteGrid from "~/components/QuoteNoteGrid";
import SectionTitle from "~/components/SectionTitle";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);
    const quote = await prisma.quote.findUnique({
        where: { id: params.quoteId},
        include: {
            tag: true, // Return all fields
            author: true,
            content: true,
        }
    })

    const author = await prisma.author.findUnique({
        where: { id: quote?.authorId}
    })

    const content = await prisma.content.findUnique({
        where: { id: quote?.contentId}
    })

    const notes = await prisma.quoteNote.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        where: {quoteId: params.quoteId}
    })
    return {author, quote, content, notes}
}


export default function QuoteDetail() {
    const quote = useLoaderData()
    const [edit, setEdit] = useState(false)
    console.log('quoteId route --> ', quote)
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            {edit ? 
                <PageTitle children={`Quote`} btn={<QuoteBackBtn  quote={quote} edit={edit} setEdit={setEdit}/>}/>
                :
                <PageTitle children={`Quote`} btn={<EditQuoteBtn  quote={quote} edit={edit} setEdit={setEdit}/>}/>
            }
            <Outlet />
            <div className="mt-20 mb-28">
                <SectionTitle children={"Notes"}/>
                <QuoteNoteGrid quote={quote}/>
            </div>
        </div>
    )
}