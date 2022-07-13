import { Form, useLoaderData } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import QuoteNote from "~/components/QuoteNote"
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const data = await prisma.quoteNote.findUnique({
        where: {id: params.quoteNoteId}
    })
    return data
}

export const action = async ({ request, params }: any) => {
    const note = await request.formData()
    const userId = 'cl4kuy4wu0009lnmfgbvhhww8'


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
                    <QuoteNote note={data}/>
                    <div>
                        <Form method="post">
                            <button
                                name="_method"
                                value="delete"
                                className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600"
                            >
                                Delete
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}