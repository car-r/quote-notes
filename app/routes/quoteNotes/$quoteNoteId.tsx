import { useLoaderData } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import QuoteNote from "~/components/QuoteNote"
import QuoteNoteDeleteCard from "~/components/QuoteNoteDeleteCard"
import QuoteNoteQuoteCard from "~/components/QuoteNoteQuoteCard"
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const data = await prisma.quoteNote.findUnique({
        where: {id: params.quoteNoteId}
    })
    const quote = await prisma.quote.findUnique({
        where: {id: data?.quoteId}
    })
    return {data, quote}
}

export const action = async ({ request, params }: any) => {
    const note = await request.formData()

    if (note.get('_method') === 'delete') {
        await prisma.quoteNote.delete({ 
            where: { id: params.quoteNoteId }
        })
        return redirect(`/quoteNotes`)
    }
}

export default function QuoteNoteId() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className="flex flex-col pt-10 md:max-w-5xl pb-6">
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="col-span-4 pb-6">
                    <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    Quote Note
                    </h3>
                </div>
                <div className="flex flex-col col-span-2 pb-4 md:pr-4">
                    <QuoteNote note={data.data}/>
                </div>
                <div className="flex flex-col gap-4 col-end-4 col-span-1">
                    <QuoteNoteQuoteCard quote={data}/>
                    <QuoteNoteDeleteCard quoteNote={data}/>
                </div>
            </div>
        </div>
    )
}