import { useLoaderData } from "@remix-run/react";
import QuoteNoteCardLarge from "~/components/QuoteNoteCardLarge";
import { prisma } from "~/db.server"
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({params}) => {
    const quoteNote = await prisma.quoteNote.findUnique({
        where: {id: params.quoteNoteId}
    })
    
    return {quoteNote}
}

export default function QuoteNoteIdHome() {
    const quoteNote = useLoaderData()
    return (
        <div>
            <QuoteNoteCardLarge quoteNote={quoteNote}/>
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
