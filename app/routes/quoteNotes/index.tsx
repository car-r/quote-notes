import { Link, useLoaderData } from "@remix-run/react";
import QuoteNote from "~/components/QuoteNote";
import PageTitle from "~/components/PageTitle";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import SectionTitle from "~/components/SectionTitle";
import QuoteNoteGrid from "~/components/QuoteNoteGrid";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    // const data = await prisma.book.findMany({
    //     where: {userId: userId},
    //     include: {
    //         quoteNote: true,
    //     },
        
    // })
    const data = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            book: {
                include: {
                    quoteNote: true
                }
            },
            _count: {
                select: {
                    quoteNote: true
                }
            }
        }
    })
    return data
}

export default function QuoteNoteIndex() {
    const data = useLoaderData()
    // const noteCount = data.length
    const noteCount = data._count.quoteNote
    console.log('quotenoteindex ->', data)
    return (
        <>
            <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
                    {noteCount > 0 ? 
                        <PageTitle children={`${noteCount} Notes`}/>
                        : 
                        <PageTitle children={`Notes`}/>
                    }
                <div className="grid grid-cols-1 gap-4">
                    {/* {data.map((note: any) => (
                        <Link to={`/quoteNotes/${note.id}`} key={note.id} className="flex">
                            <QuoteNote note={note}/>
                        </Link>))
                    } */}
                    {data.book.map((book: any) => (
                        <div key={book.title} className="mb-16">
                            <SectionTitle children={book.title}/>
                            <div className="flex overflow-auto pb-6 snap-x scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                                <div className="flex md:flex md:flex-row gap-4 mx-1">
                                    {book.quoteNote.map((note: any) => (  
                                        <Link to={`/quoteNotes/${note.id}`} key={note.id} className="flex justify-center items-center w-44 h-24  border border-stone-500 rounded-sm p-3 hover:bg-stone-700 hover:text-white">
                                            <p className=" line-clamp-3 text-sm">{note.body}</p>
                                        </Link>  
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
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