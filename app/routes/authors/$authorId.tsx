import { useLoaderData, Link, Outlet, useCatch, useParams, useOutletContext } from "@remix-run/react"
import { useState } from "react"
// import AddContentCard from "~/components/AddBookCard"
import AddQuoteCard from "~/components/AddQuoteCard"
// import AuthorRouteAuthorCard from "~/components/AuthorRouteAuthorCard"
import EditAuthorBtn from "~/components/Buttons/EditAuthorBtn"
// import BookCard from "~/components/BookCard"
import BookHomeCard from "~/components/BookHomeCard"
import PageTitle from "~/components/PageTitle"
import SectionTitle from "~/components/SectionTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import AddBookCard from "~/components/AddBookCard"
import AuthorRouteCard from "~/components/AuthorRouteCard"
import AuthorBackBtn from "~/components/Buttons/AuthorBackBtn"
import AuthorErrorBackBtn from "~/components/Buttons/AuthorErrorBackBtn"
import AddBookBtn from "~/components/Buttons/AddBookBtn"
import AddQuoteBtn from "~/components/Buttons/AddQuoteBtn"
import React from "react"

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);

    const author = await prisma.author.findUnique({
        where: { id: params.authorId },
        include: {
            _count: {
              select: {
                quote: true,
                book: true,
                quoteNote: true
              }
            },
            book: {
                where: {userId: userId},
                include: {
                    author: true,
                }
            },
            quote: {
                where: {isFavorited: {equals: 'isFavorited'}}
            }
          }
    })

    if (!author) {
        throw new Response("Can't find author.", {
            status: 404,
        })
    }
    
    return {author}
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

export default function AuthorDetail() {
    const data = useLoaderData()
    const [edit, setEdit] = React.useState<ContextEditType | ContextSetEditType>()
    // const [edit, setEdit] = useState(false)
    console.log(data)

    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <PageTitle children={data.author.name} btn={<EditAuthorBtn  data={data} />}/>
            {/* {edit ? 
                <PageTitle children={data.author.name} btn={<AuthorBackBtn  data={data} edit={edit} setEdit={setEdit}/>}/>
                :
                <PageTitle children={data.author.name} btn={<EditAuthorBtn  data={data} edit={edit} setEdit={setEdit}/>}/>
            }             */}
            {/* <PageTitle children={data.author.name} btn={<EditAuthorBtn author={data} edit={edit} setEdit={setEdit}/>}/> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl py-2 mb-20">
                <AuthorRouteCard author={data}/>
                <Outlet context={[edit, setEdit]}/>
            </div>
            {/* <AuthorRouteAuthorCard author={data} actionData={actionData} edit={edit} /> */}
            <div className="mb-28">
                <SectionTitle children={'Books'} btn={<AddBookBtn />}/>
                {data.author._count.book < 1 ?
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                        <Link to={`/books/new`}>
                            <AddBookCard />
                        </Link> 
                    </div>
                    :
                    <div className="flex overflow-auto pb-6 snap-x scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700 p-1 gap-4">
                        {data.author.book.map((book: any) => (
                            <Link to={`/books/${book.id}`} key={book.id}>
                                <BookHomeCard book={book}/>
                            </Link>
                        ))}
                    </div>
                }
            </div>
            <div className="flex flex-col pb-1 mb-28">
                {data.author._count.quote > 0 ?
                    <div>
                        <SectionTitle children={'Favorite Quotes'}/>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                            {data.author.quote.map((quote: any) => (
                                <Link to={`/quotes/${quote.id}`} key={quote.id} className="flex ">
                                    <div className=" flex flex-col justify-center p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 ring-blue-400 hover:text-stone-100">
                                        <p className="text-md text-center italic font-semibold">"{quote.body}"</p>
                                    </div>
                                </Link>
                            ))}
                        </div> 
                    </div>
                :
                <div>
                    <SectionTitle children={'Quotes'} btn={<AddQuoteBtn />}/>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {data.author._count.quote < 1 ? <AddQuoteCard /> : 
                            data.quotes.map((quote: any) => (
                                <Link to={`/quotes/${quote.id}`} key={quote.id} className="">
                                    <div className="p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 ring-blue-400 hover:text-stone-100">
                                        <p className="text-lg text-center italic font-semibold ">"{quote.body}"</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>  
                </div>
                } 
            </div> 
        </div>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
    const quotes = {title: 'Quotes', count: '0'}
    const books = {title: 'Books', count: '0'}
    const notes = {title: 'Notes', count: '0'}
    const detailArray = [books, quotes, notes]
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <PageTitle children={`Author`} btn={<AuthorErrorBackBtn />}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl py-2 mb-20">
                <div className="flex flex-col justify-center p-4 border border-red-500 text-red-500 bg-stone-800 rounded-md ">
                    <p className="text-xs sm:text-sm md:text-base text-center italic font-semibold py-6">
                        {`Looks like an error ${error}`}
                    </p>
                </div>
                <div className="flex flex-col sm:h-full sm:justify-center border-2 border-stone-800 p-4 rounded-lg">
                    <div className="mb-3">
                        {detailArray.map((detail) => (
                            <div key={detail.title} className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0 ">
                                <p className="text-sm font-semibold tracking-wider uppercase">{detail.title}</p>
                                <p><span className="font-thin text-2xl">{detail.count}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mb-28">
                <SectionTitle children={'Books'}/>
            </div>
            <div className="mb-28">
                <SectionTitle children={'Quotes'}/>
            </div>
        </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();
    const params = useParams();
    const quotes = {title: 'Quotes', count: '0'}
    const books = {title: 'Books', count: '0'}
    const notes = {title: 'Notes', count: '0'}
    const detailArray = [books, quotes, notes]
    if (caught.status === 404) {
      return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <PageTitle children={`Author`} btn={<AuthorErrorBackBtn />}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl py-2 mb-20">
                <div className="flex flex-col justify-center p-4 border border-red-500 text-red-500 bg-stone-800 rounded-md ">
                    <p className="text-xs sm:text-sm md:text-base text-center italic font-semibold py-6">
                        {`Can't find author ${params.authorId}`}
                    </p>
                </div>
                <div className="flex flex-col sm:h-full sm:justify-center border-2 border-stone-800 p-4 rounded-lg">
                    <div className="mb-3">
                        {detailArray.map((detail) => (
                            <div key={detail.title} className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0 ">
                                <p className="text-sm font-semibold tracking-wider uppercase">{detail.title}</p>
                                <p><span className="font-thin text-2xl">{detail.count}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mb-28">
                <SectionTitle children={'Books'}/>
            </div>
            <div className="mb-28">
                <SectionTitle children={'Quotes'}/>
            </div>
        </div>
      );
    }
    throw new Error(`Unhandled error: ${caught.status}`);
}