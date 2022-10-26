import { useActionData, useLoaderData, useOutletContext, useTransition } from "@remix-run/react"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";
import UpdateBtn from "~/components/Buttons/UpdateBtn";
import ActionDataError from "~/components/ActionDataError";

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


        const isValidImageUrl = new RegExp('(jpe?g|png|gif|bmp)$')

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
    const [edit, setEdit]: any = useOutletContext()

    useEffect(() => {
        if (!isUpdating) {
            formRef.current?.reset();
            // setEdit(false)
        }
        else if (isUpdating) {
            setEdit(false)
        }
    },[isUpdating, setEdit, edit])
    

    console.log('bookId Edit data --> ', data)
    return (
        <div className="p-4 border border-stone-800 bg-stone-800 rounded-md">
            <div className="flex flex-col gap-4 md:w-80">
            <Form method="post" ref={formRef}>
                <div className="flex flex-col">
                    <button type="submit" name="_method" value="deleteBook" className="flex justify-end relative hover:text-stone-100 active:text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold tracking-wider uppercase">
                                Title
                            </label>
                            <input type="text" name="title" className="px-2 border border-stone-800 bg-stone-700 rounded" defaultValue={data.data.book[0].title}/>
                            {actionData?.errors.title && (
                                <ActionDataError children={actionData.errors.title} />
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold tracking-wider uppercase">
                                Author
                            </label>
                            <select name="selectAuthorId" className="bg-stone-700 rounded-sm p-1" >
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
                            <input type="text" name="imgUrl" className="px-2 border border-stone-800 bg-stone-700 rounded" defaultValue={data.data.book[0].imgUrl}/>
                            {actionData?.errors.imgUrl && (
                                <ActionDataError children={actionData.errors.imgUrl} />
                            )}
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
                    <div className="flex flex-col mt-6">
                        <button type="submit" name="_method" value="update" disabled={isUpdating || isDeleting} className="flex justify-end" >
                            <UpdateBtn children={isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Book"} />
                        </button> 
                    </div>
                </div>
            </Form>
            </div>
        </div>
    )
}