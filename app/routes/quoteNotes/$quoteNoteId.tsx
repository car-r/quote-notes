import { Form, Link, useLoaderData } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import QuoteNote from "~/components/QuoteNote"
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
    const userId = 'cl5j0h3ey00090bmf1xn3f4vo'


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
        <div className="flex flex-col pt-10 md:max-w-4xl pb-6">
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="col-span-4 pb-6">
                    <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    Quote Note
                    </h3>
                </div>
                <div className="flex flex-col col-span-1">
                    <QuoteNote note={data.data}/>
                </div>
                <div className="flex flex-col gap-4 col-end-4 col-span-1">
                    <Link to={`/quotes/${data.quote.id}`} >
                        <div className="p-4  border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400">
                            <p className="text-xl text-center pb-6 italic font-semibold">"{data.quote.body}"</p>
                            <p className="font-light"><Link to={`/authors/${data.quote.authorId}`}>{data.quote.authorName}</Link></p>
                        </div>
                    </Link>
                    <div className="flex flex-col gap-1 bg-stone-800 p-4 rounded-lg max-w-xl">
                        <div className="flex flex-col py-3 border-b border-stone-700 w-full">
                            <p className="text-sm font-semibold tracking-wider uppercase">Note ID: </p>
                            <p><span className="font-thin text-lg">{data.data.id}</span></p>
                        </div>
                        <div className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0">
                            <p className="text-sm font-semibold tracking-wider uppercase">Note created: </p>
                            <p><span className="font-thin text-lg">{data.data.createdAt}</span></p>
                        </div>
                        <div className="mt-4">
                            <Form method="post">
                                <button
                                    name="_method"
                                    value="delete"
                                    className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600 flex"
                                >
                                    Delete Note
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}