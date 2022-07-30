import { Link, useLoaderData } from "@remix-run/react";
import QuoteNote from "~/components/QuoteNote";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader =async ({request}: any) => {
    const userId = await requireUserId(request);
    const data = await prisma.quoteNote.findMany({
        where: {userId: userId}
    })
    return data
}

export default function QuoteNoteIndex() {
    const data = useLoaderData()
    console.log(data)
    return (
        <>
            <div className="flex flex-col pt-10 max-w-4xl">
                <div className="pb-6">
                    <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    Your Notes
                    </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((note: any) => (
                        <Link to={`/quoteNotes/${note.id}`} key={note.id}>
                            <QuoteNote note={note}/>
                        </Link>))
                    }
                </div>
            </div>
        </>
    )
}