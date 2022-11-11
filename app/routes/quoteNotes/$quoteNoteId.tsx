import { Outlet, useCatch, useLoaderData, useOutletContext, useParams } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import { useEffect, useState } from "react"
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

type Edit = {
    edit: React.Dispatch<React.SetStateAction<boolean>>
}

type SetEdit = {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

type ContextEditType = { edit: Edit}
type ContextSetEditType = { setEdit: SetEdit}

interface Props {
    edit: boolean;
    setEdit: (edit: boolean) => void
}

export function useEdit() {
    return useOutletContext<ContextEditType>()
}
export function useSetEdit() {
    return useOutletContext<ContextSetEditType>()
}

export default function QuoteNoteId() {
    const data = useLoaderData()
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        setEdit(false)
    },[])
    // console.log(data)
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`Note`} btn={<EditNoteBtn data={data} edit={edit} setEdit={setEdit}/>}/>
            {/* {edit ? 
                <PageTitle children={`Note`} btn={<NoteBackBtn data={data} edit={edit} setEdit={setEdit}/>}/>
                :
                <PageTitle children={`Note`} btn={<EditNoteBtn data={data} edit={edit} setEdit={setEdit}/>}/>
            }  */}
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
            <PageTitle children={`Note`}/>
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
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

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <PageTitle children={`Note`}/>
            <div className='flex flex-col max-w-xl justify-center py-10 px-6  border border-red-500 text-red-500 rounded-lg text-center'>
                <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
            </div>
        </div>
    );
}