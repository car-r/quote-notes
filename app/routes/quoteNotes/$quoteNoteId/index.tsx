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

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col max-w-5xl">
            <div className='flex flex-col max-w-xl justify-center py-10 px-6  border border-red-500 text-red-500 rounded-lg text-center'>
                <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
            </div>
        </div>
    );
}
