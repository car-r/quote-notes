import { Form, Outlet, useActionData, useCatch, useLoaderData, useParams, useTransition } from "@remix-run/react"
import { Link } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import { Response } from "@remix-run/web-fetch"
import { useEffect, useRef, useState } from "react"
// import BookEditCard from "~/components/BookEditCard"
import BookBackBtn from "~/components/Buttons/BookBackBtn"
import BookErrorBackBtn from "~/components/Buttons/BookErrorBackBtn"
import EditBookBtn from "~/components/Buttons/EditBookBtn"
import PrimaryActionBtn from "~/components/Buttons/PrimaryActionBtn"
// import SuccessBtn from "~/components/Buttons/SuccessBtn"
// import ContentEditCard from "~/components/BookEditCard"
import PageTitle from "~/components/PageTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);
    // const data = await prisma.user.findUnique({
    //     where: { id: userId},
    //     include: {
    //         book: {
    //             where: {id: params.bookId},
    //             include: {
    //                 author: true,
    //                 quote: {
    //                     orderBy: [
    //                         {
    //                             createdAt: 'desc'
    //                         }
    //                     ]
    //                 }
    //             }
    //         },
    //         authors: true
    //     }
    // })

    const data = await prisma.book.findUnique({
        where: { id: params.bookId },
        include: {
            author: true,
            quote: {
                where: {userId: userId},
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ]
            }
        }
    })
    if (!data) {
        throw new Response("Can't find book.", {
            status: 404,
        })
    }

    // const response = await fetch(`https://openlibrary.org/isbn/${data.ISBN}.json`)
    //     .then((response) => response.json())
    //     .then((openLibrary) => console.log('OL loader --> ',openLibrary))


    // const response = await fetch(`https://openlibrary.org/isbn/${data.ISBN}.json`)
    // const responseString = await response
    

    // const book = await prisma.book.findUnique({
    //     where: { id: params.bookId },
    //     include: {
    //         author: true
    //     }
    // })

    // const quotes = await prisma.quote.findMany({
    //     orderBy: [
    //         {
    //             createdAt: 'desc',
    //         },
    //     ],
    //     where: { userId: userId, bookId: params.bookId}
    // })

    // const authors = await prisma.author.findMany({
    //     orderBy: [
    //         {
    //             createdAt: 'desc',
    //         },
    //     ],
    //     where: { userId: userId}
    // })

    // if (!book) {
    //     throw new Response("Can't find book.", {
    //         status: 404,
    //     })
    // }

    // return {book, quotes, authors, data}
    return {data}
}

export const action = async ({request}: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const authorId = form.get('authorId')
    // const selectAuthorId = form.get('selectAuthorId')
    const body = form.get('body')
    const bookId = form.get('bookId')
    const authorName = form.get('authorName')
    const id = form.get('id')
    const isFavorited = form.get('isFavorited')
    // const title = form.get('title')
    // const imgUrl = form.get('imgUrl')
    // const selectAuthorName = form.get('selectAuthorName')
    console.log(Object.fromEntries(form))


    // Action to create Quote
    if(form.get('_method') === 'create') {
        const errors = {
            body: '',
        }

        function checkBody(body: any) {
            if(!body || body.length < 4) {
                return errors.body = `Quote too short`
            }
        }
    
        checkBody(body)

        if (errors.body) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = { authorId, body, userId, bookId, authorName }
        await prisma.quote.create({ data: fields})
        return redirect(`/books/${bookId}`)
    }



    // Action to update if Quote is favorited
    if (form.get('_method') !== 'create') {
        await prisma.quote.update({
            where: { id: id },
            data: { isFavorited: isFavorited }
        })
            return redirect(`/books/${bookId}`)
    }
}

// export type Edit = {
//     edit: boolean
//     setEdit: boolean
// }

// type ContextType = { edit: Edit | false }
// declare function useOutletContext< Context = unknown >(): Context

export default function BookIdRoute() {
    // const [edit, setEdit] = useState(false)
    // const [edit, setEdit] = useState<Edit | false> (false)
    const data = useLoaderData()
    let transition = useTransition()
    let isAdding = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "create"

    // let formRef = useRef()
    const formRef = useRef<HTMLFormElement>(null)
    const book = data.data
    // const book = data.book
    // const authors = data.authors
    console.log('bookId --> ', data)
    console.log('bookId book --> ', book)
    // console.log('bookId edit state --> ', edit)
    const actionData = useActionData()

    useEffect(() => {
        if (!isAdding) {
            formRef.current?.reset();
            // setEdit(false)
        }
    },[isAdding])

    console.log('bookId route --> ', data)
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-6xl">
            <PageTitle children={book.title} btn={<BookBackBtn  data={data} />}/>
            {/* {edit ? 
                <PageTitle children={book.title} btn={<BookBackBtn  data={data} edit={edit} setEdit={setEdit}/>}/>
                :
                <PageTitle children={book.title} btn={<EditBookBtn  data={data} edit={edit} setEdit={setEdit}/>}/>
            }  */}
            {/* <PageTitle children={`${data.book.title}`}/> */}
            <div className="grid grid-cols-1 md:flex gap-6 ">
                {book.quote.length < 1 ? 
                    <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-1 lg:grid-cols-2 pb-1">
                        <div className="flex flex-col h-32 justify-center p-4 outline-dashed border border-stone-800 bg-stone-800 rounded-md lg:w-96 ">
                            <p className="text-center">Add your first quote</p>
                        </div>
                    </div> 
                    : 
                    <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-1 md:grid-flow-row md:auto-rows-max lg:grid-cols-2 pb-1">
                        {book.quote.map((quote: any) => (
                            <div key={quote.id} className="flex flex-col p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:ring-2 hover:ring-blue-400 hover:text-stone-100 min-w-[165px]">
                                <div className="flex flex-col min-h-full">
                                    <Form method="post">
                                        <div onClick={() => console.log('clicked')} className="flex justify-end ">   
                                            <div className="flex flex-col">
                                            <input type="hidden" name="id" value={quote.id}/>
                                            <input type="hidden" name="bookId" value={book.id}/>
                                            {quote.isFavorited === "isFavorited" ? <input type="hidden" name="isFavorited" value="notFavorited"/> : <input type="hidden" name="isFavorited" value="isFavorited"/>}
                                                <button type="submit">
                                                    {quote.isFavorited === "isFavorited" ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-right" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                    <Link to={`/quotes/${quote.id}`} className="flex flex-col flex-1 justify-center py-4 px-5">
                                        <div className=" ">
                                            <p className="text-lg text-center italic font-semibold">"{quote.body}"</p>
                                        </div>
                                    </Link>
                                </div>
                            </div> 
                        ))}
                    </div>
                }
                <div className="flex flex-col md:h-screen md:sticky top-10 gap-6 order-first md:order-last md:ml-auto">
                    <Form method="post" ref={formRef}
                        className="flex flex-col gap-4 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
                    >
                        <div className="flex flex-col">
                            <label></label>
                            <textarea
                            name="body"
                            rows={3}
                            className="min-w-xl mb-1 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-lg"
                            />
                            {actionData?.errors.body && (
                                <p className="text-red-400 text-sm">{actionData.errors.body}</p>
                            )}
                        </div>
                        <div className="hidden">
                            <input type="hidden" name="authorId" value={book.authorId}/>
                        </div>
                        {/* <div className="hidden">
                            <input type="hidden" name="authorName" value={content.authorName}/>
                        </div> */}
                        <div className="hidden">
                            <input type="hidden" name="bookId" value={book.id}/>
                        </div>

                        <div className="flex flex-col">
                            {/* <button type="submit" name="_method" value="create" disabled={isAdding}
                                className={`px-4 py-2 bg-blue-400 text-white rounded flex justify-center hover:bg-blue-600`} 
                                >
                                {isAdding ? "Adding..." : "Add Quote"}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </button> */}
                            <button type="submit" name="_method" value="create" disabled={isAdding}>
                                <PrimaryActionBtn children={isAdding ? "Adding..." : "Add Quote"}/>
                            </button>
                            
                        </div>
                    </Form>
                    <div>
                        {/* <Outlet context={ [edit, setEdit] }/> */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`Book`} btn={<BookErrorBackBtn />}/>
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="flex flex-col col-span-2 ">
                    <div className='flex flex-col justify-center py-10 border border-red-500 text-red-500 rounded-lg text-center w-full'>
                        <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();
    const params = useParams();
    if (caught.status === 404) {
      return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`Book`} btn={<BookErrorBackBtn />}/>
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="flex flex-col col-span-2 ">
                    <div className='flex flex-col justify-center py-10 border border-red-500 text-red-500 rounded-lg text-center w-full'>
                        <p className="text-sm font-semibold tracking-wide">{`Can't find book ${params.bookId}`}</p>
                    </div>
                </div>
            </div>
        </div>
      );
    }
    throw new Error(`Unhandled error: ${caught.status}`);
}