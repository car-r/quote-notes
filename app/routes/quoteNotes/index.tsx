import { Link, useLoaderData } from "@remix-run/react";
import QuoteNote from "~/components/QuoteNote";
import PageTitle from "~/components/PageTitle";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const data = await prisma.quoteNote.findMany({
        where: {userId: userId}
    })
    return data
}

export default function QuoteNoteIndex() {
    const data = useLoaderData()
    const noteCount = data.length
    console.log(data)
    return (
        <>
            <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
                    {noteCount > 0 ? 
                        <PageTitle children={`${noteCount} Notes`}/>
                        : 
                        <PageTitle children={`Notes`}/>
                    }
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((note: any) => (
                        <Link to={`/quoteNotes/${note.id}`} key={note.id} className="flex">
                            <QuoteNote note={note}/>
                        </Link>))
                    }
                </div>
            </div>
        </>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <PageTitle children={`Notes`}/>
            <div className='flex flex-col max-w-xl justify-center py-10 px-6  border border-red-500 text-red-500 rounded-lg text-center'>
                <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
            </div>
        </div>
    );
}