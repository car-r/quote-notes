import { Link, useActionData, useLoaderData, useOutletContext, useTransition } from "@remix-run/react"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import UpdateBtn from "~/components/Buttons/UpdateBtn";
import ActionDataError from "~/components/ActionDataError";
import ActionDataInput from "~/components/ActionDataInput";
import FormInput from "~/components/FormInput";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);
    const data = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            book: {
                where: { id: params.bookId},
                include: {
                    author: true,
                }
            },
            authors: {
                where: { userId: userId}
            }
          }
    })
    return {data}
}

export const action = async ({request}: any) => {
    const form = await request.formData()
    const selectAuthorId = form.get('selectAuthorId')
    const bookId = form.get('bookId')
    const title = form.get('title')
    const imgUrl = form.get('imgUrl')
    const selectAuthorName = form.get('selectAuthorName')
    console.log(Object.fromEntries(form))

    // Action to update Book
    if (form.get('_method') === 'update') {
        const authorId = selectAuthorId
        const authorName = selectAuthorName

        const errors = {
            title: '',
            imgUrl: ''
        }

        function checkTitleName(title: any) {
            if(!title || title.length < 3) {
                return errors.title = `Title too short`
            }
        }

        checkTitleName(title)


        const isValidImageUrl = new RegExp('(jpe?g|png|gif|bmp|jpg)$')

        const validateImageUrl = (value: string) => {
            if (!isValidImageUrl.test(value)) {
                return errors.imgUrl = `Not a valid Image URL`
            }
        
        }

        validateImageUrl(imgUrl)

        if (errors.title || errors.imgUrl) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        await prisma.book.update({
            where: { id: bookId },
            data: { title: title, authorId: authorId, imgUrl: imgUrl, authorName: authorName }
        })

        await prisma.quote.updateMany({ 
            where: { bookId: bookId },
            data: { authorId: authorId, authorName: authorName }
        })

        return redirect(`/books/${bookId}`)

    }

    // Action to delete Book
    if(form.get('_method') === 'deleteBook') {
        await prisma.book.delete({where: {id: bookId}})
        return redirect(`/books`)
    }

}



export default function EditBook() {
    const data = useLoaderData()
    const actionData = useActionData()
    let transition = useTransition()

    let isDeleting = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "deleteBook"

    let isUpdating = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "update"


    // let formRef = useRef()
    const formRef = useRef<HTMLFormElement>(null)
    // const [edit, setEdit]: any = useOutletContext()
    const [willDelete, setWillDelete] = useState(false)

    // useEffect(() => {
    //     if (!isUpdating) {
    //         formRef.current?.reset();
    //         setEdit(false)
    //     }
    //     else if (isUpdating) {
    //         setEdit(false)
    //     }
    // },[isUpdating, setEdit, edit])

    useEffect(() => {
        if (!isUpdating) {
            formRef.current?.reset();
        }

    },[isUpdating])
    

    console.log('bookId Edit data --> ', data)
    return (
        <div className="flex flex-col py-6 px-4 border-2 border-stone-800 bg-stone-800 rounded-md max-h-96">
            <div className="flex flex-col gap-4 md:w-80">
            <Form method="post" ref={formRef}>
                <div className="flex flex-col">
                    {/* <div onClick={() => setWillDelete(!willDelete)} className="flex justify-end relative hover:cursor-pointer hover:text-stone-100">
                        {!willDelete ? 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        }
                    </div> */}
                    <div className="flex w-full justify-between pb-4">
                        <Link to={`/books/${data.data.book[0].id}`} className=" hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>

                        <div onClick={() => setWillDelete(!willDelete)} className=" hover:text-white hover:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                    </div>
                    {/* <div className="flex w-full justify-end">
                        <Link to={`/books/${data.data.book[0].id}`} className=" hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                    </div> */}
                    
                    {/* <button type="submit" name="_method" value="deleteBook" className="flex justify-end relative hover:text-stone-100 active:text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button> */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold tracking-wider uppercase">
                                Title
                            </label>
                            {actionData?.errors.title ? (
                                <div className="flex flex-col">
                                    <ActionDataInput type="text" name="title" defaultValue={data.data.book[0].title}/>
                                    <ActionDataError children={actionData.errors.title} />
                                </div>
                            ) : 
                                <FormInput type="text" name="title" defaultValue={data.data.book[0].title}/>
                            }
                            {/* <input type="text" name="title" className="px-2 border border-stone-800 bg-stone-700 rounded" defaultValue={data.data.book[0].title}/>
                            {actionData?.errors.title && (
                                <ActionDataError children={actionData.errors.title} />
                            )} */}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold tracking-wider uppercase">
                                Author
                            </label>
                            <select name="selectAuthorId" className="bg-stone-700 rounded py-2 px-1" >
                                <option value={data.data.book[0].authorId}>{data.data.book[0].author.name}</option>

                                {data.data.authors.filter((author: any) => author.id !== data.data.book[0].authorId).map((author: any) => (
                                    <option key={author.id}  value={author.id}>{author.name}</option>
                            ))}
                            </select>
                        </div>
                
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold tracking-wider uppercase">
                                Image URL
                            </label>
                            {actionData?.errors.imgUrl ? (
                                <div className="flex flex-col">
                                    <ActionDataInput type="text" name="imgUrl" defaultValue={data.data.book[0].imgUrl}/>
                                    <ActionDataError children={actionData.errors.imgUrl} />
                                </div>
                            ) : 
                                <FormInput type="text" name="imgUrl" defaultValue={data.data.book[0].imgUrl}/>
                                
                            }
                            {/* <input type="text" name="imgUrl" className="px-2 border border-stone-800 bg-stone-700 rounded" defaultValue={data.data.book[0].imgUrl}/>
                            {actionData?.errors.imgUrl && (
                                <ActionDataError children={actionData.errors.imgUrl} />
                            )} */}
                        </div>

                        <div className="hidden">
                            <input type="hidden" name="bookId" value={data.data.book[0].id}/>
                        </div>
                    </div>
                    {/* <div className="flex flex-col mt-6">
                        <button type="submit" name="_method" value="update" disabled={isUpdating || isDeleting}  className="px-6 py-2 border-2 border-blue-400 bg-transparent hover:bg-blue-600 hover:border-blue-600 text-white rounded">
                            {isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Book"}
                        </button> 
                    </div> */}
                    <div className="flex mt-6">
                        {!willDelete ?
                        <div className="flex">
                            <button 
                                type="submit" name="_method" value="update" disabled={isUpdating || isDeleting} >
                                <UpdateBtn children={isUpdating ? "Updating..." : "Update Book"} />
                            </button> 
                            {/* <div onClick={() => setWillDelete(!willDelete)} 
                                className="text-sm flex items-center rounded border-2 border-red-400 hover:cursor-pointer hover:border-red-600 hover:text-stone-200">
                                <p className="mx-auto  ">Delete</p>
                            </div> */}
                        </div> 
                        :
                        <button 
                            type="submit" name="_method" value="deleteBook" disabled={isUpdating || isDeleting}
                            className="py-2 px-2 flex justify-center gap-2 items-center text-sm text-white rounded bg-red-400 border-2 border-red-400 hover:bg-red-600 hover:border-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            {isDeleting ? "Deleting..." : "Delete Author"}
                        </button> 
                        }
                        {/* <button type="submit" name="_method" value="update" disabled={isUpdating || isDeleting} className="flex " >
                            <UpdateBtn children={isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Book"} />
                        </button>  */}
                    </div>
                </div>
            </Form>
            </div>
        </div>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <div className='flex flex-col max-w-xl justify-center py-10 px-6  border border-red-500 text-red-500 rounded-lg text-center'>
                <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
            </div>
        </div>
    );
}