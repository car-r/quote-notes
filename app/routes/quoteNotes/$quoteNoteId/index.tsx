import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import QuoteNoteCardLarge from "~/components/QuoteNoteCardLarge";
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const data = await prisma.quoteNote.findUnique({
        where: {id: params.quoteNoteId}
    })
    
    return {data}
}

export default function QuoteNoteIdHome() {
    const data = useLoaderData()
    return (
        <div>
            <QuoteNoteCardLarge data={data}/>
        </div>
    )
}
