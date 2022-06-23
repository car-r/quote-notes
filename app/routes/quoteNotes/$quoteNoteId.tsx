import { useLoaderData } from "@remix-run/react"
import QuoteNote from "~/components/QuoteNote"
import { prisma } from "~/db.server"

export const loader =async ({params}: any) => {
    const data = await prisma.quoteNote.findUnique({
        where: {id: params.quoteNoteId}
    })
    return data
}

export default function QuoteNoteId() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className="flex flex-col pt-10">
            <h2 className="text-stone-300/60 text-xl pb-6">Quote Note</h2>
            <QuoteNote note={data}/>
        </div>
    )
}