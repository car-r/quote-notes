import { Form, useLoaderData } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import QuoteNote from "~/components/QuoteNote"
import { prisma } from "~/db.server"

export const loader =async ({params}: any) => {
    const data = await prisma.quoteNote.findUnique({
        where: {id: params.quoteNoteId}
    })
    return data
}

export const action =async ({ request, params }: any) => {
    const note = await request.formData()

    if (note.get('_method') === 'delete') {
        await prisma.quoteNote.delete({ 
            where: { id: params.quoteNoteId}
        })
        return redirect(`/quotes/${params.quoteId}`)
    }
}

export default function QuoteNoteId() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className="flex flex-col pt-10">
            <h2 className="text-stone-300/60 text-xl pb-6">Quote Note</h2>
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
    )
}