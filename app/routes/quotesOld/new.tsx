import { redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData } from "@remix-run/react"
import { prisma } from "~/db.server"
import { useState } from "react"
import { requireUserId } from "~/session.server";

export const action = async ({request}: any) => {
    const form = await request.formData()
    const userId = await requireUserId(request);
    const authorId = form.get('authorId')
    const body = form.get('body')
    const bookId = form.get('bookId')
    const authorName = form.get('authorName')
    console.log(Object.fromEntries(form))

    const fields = { authorId, body, userId, bookId, authorName }

    const errors = {
        body: '',
        bookId: ''
    }

    function checkBody(body: any) {
        if(!body || body.length < 4) {
            return errors.body = `Quote too short`
        }
    }

    checkBody(body)

    function checkBookId(bookId: any) {
        if(bookId === 'nobook') {
            return errors.bookId = `Please create book first`
        }
    }

    checkBookId(bookId)

    if (errors.body || errors.bookId) {
        const values = Object.fromEntries(form)
        return { errors, values }
    }

    const quote = await prisma.quote.create({ data: fields})
    return redirect(`/quotes/${quote.id}`)
}

export const loader = async () => {
    const authors = await prisma.author.findMany()
    const users = await prisma.user.findMany()
    const book = await prisma.book.findMany()
    return {authors, users, book}
}

export default function NewQuote() {
    const actionData = useActionData()
    const data = useLoaderData()
    const [authorName, setAuthorName] = useState(data.authors[0].name)
    const [authorId, setAuthorId] = useState(data.authors[0].id)

    function onAuthorChange(e: any) {
        console.log(e.target.value)
        console.log(data.authors.length)
        for (const author of data.authors) {
            if (author.id === e.target.value) {
                console.log('its a match on ' + author.name)
                setAuthorName(author.name)
                setAuthorId(author.id)
            }
            else {
                console.log('no match')
            }
        }
    }

    console.log(data)
    
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-4xl pb-6">
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="col-span-3 pb-6">
                    <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    New Quote
                    </h3>
                </div>
                <Form method="post"
                    className="flex flex-col gap-6 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light md:w-72"
                >
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Quote
                        </label>
                        <textarea
                        name="body"
                        rows={3}
                        className="min-w-xl mb-1 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-lg"
                        />
                        {actionData?.errors.body && (
                            <p className="text-red-400 text-sm">{actionData.errors.body}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Author
                        </label>
                        <select name="authorId" className="bg-stone-700 rounded-sm p-1" onChange={onAuthorChange}>
                            {data.authors.map((author: any) => (
                                <option key={author.id}  value={author.id}>{author.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Book
                        </label>
                        <select name="bookId" className="bg-stone-700 rounded-sm p-1">
                            {data.book.filter((book: any) => book.authorId === authorId) < 1 ? 
                                <option value='nobook'></option> 
                                : 
                                data.book.filter((book: any) => book.authorId === authorId).map((book: any) => (
                                <option key={book.id} value={book.id} >{book.title}</option>
                            ))}
                        </select>
                        {actionData?.errors.bookId && (
                            <p className="text-red-400 text-sm">{actionData.errors.bookId}</p>
                        )}
                    </div>
                    
                    <input type="hidden" name="authorName" value={authorName}/>
                    <div className="flex flex-col">
                        <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600">Add Quote</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}