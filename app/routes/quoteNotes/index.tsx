import { Link, useLoaderData } from "@remix-run/react";
import QuoteNote from "~/components/QuoteNote";
import { prisma } from "~/db.server";

export const loader =async () => {
    const data = await prisma.quoteNote.findMany()
    return data
}

export default function QuoteNoteIndex() {
    const data = useLoaderData()
    console.log(data)
    return (
        <>
            <div className="flex flex-col pt-10">
                <h3 className="text-xl pb-6">Saved Notes</h3>
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