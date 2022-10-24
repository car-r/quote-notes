import { Outlet, useCatch, useLoaderData, useParams } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import { useState } from "react"
import EditNoteBtn from "~/components/Buttons/EditNoteBtn"
import NoteBackBtn from "~/components/Buttons/NoteBackBtn"
import PageTitle from "~/components/PageTitle"
import QuoteNote from "~/components/QuoteNote"
import QuoteNoteDeleteCard from "~/components/QuoteNoteDeleteCard"
import QuoteNoteQuoteCard from "~/components/QuoteNoteQuoteCard"
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const data = await prisma.quoteNote.findUnique({
        where: {id: params.quoteNoteId},
        include: {
            quote: true,
            author: true,
            book: true,
        }
    })
    // const quote = await prisma.quote.findUnique({
    //     where: {id: data?.quoteId}
    // })

    if (!data) {
        throw new Response("Can't find note.", {
            status: 404,
        })
    }
    
    return {data}
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
    const [edit, setEdit] = useState(false)
    // console.log(data)
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            {edit ? 
                <PageTitle children={`Note`} btn={<NoteBackBtn data={data} edit={edit} setEdit={setEdit}/>}/>
                :
                <PageTitle children={`Note`} btn={<EditNoteBtn data={data} edit={edit} setEdit={setEdit}/>}/>
            } 
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                {/* <div className="col-span-4 pb-6">
                    <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    Quote Note
                    </h3>
                </div> */}
                <div className="flex flex-col col-span-2 pb-4 md:pr-4">
                    <Outlet context={ [edit, setEdit] }/>
                    {/* <QuoteNote note={data.data}/> */}
                </div>
                <div className="flex flex-col gap-6 col-end-4 col-span-1">
                    <QuoteNoteQuoteCard data={data}/>
                    <QuoteNoteDeleteCard quoteNote={data}/>
                </div>
            </div>
        </div>
    )
}

export function CatchBoundary() {
    const caught = useCatch();
    const params = useParams();
    if (caught.status === 404) {
      return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="col-span-4 pb-6">
                    <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    Note
                    </h3>
                </div>
                <div className="flex flex-col col-span-2 pb-4 md:pr-4">
                    <div className='flex flex-col justify-center p-10 border border-red-500 text-red-500 rounded-sm text-center w-full'>
                        <p className="font-semibold tracking-wide">{`Can't find note ${params.quoteNoteId}`}</p>
                    </div>
                </div>
            </div>
        </div>
      );
    }
    throw new Error(`Unhandled error: ${caught.status}`);
}