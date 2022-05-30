import { redirect } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { prisma } from "~/db.server"

export const action = async ({request}: any) => {
    const form = await request.formData()
    const authorId = form.get('authorId')
    const body = form.get('body')
    const userId = form.get('userId')
    const contentId = form.get('contentId')

    const fields = { authorId, body, userId, contentId }

    const quote = await prisma.quote.create({ data: fields})
    return redirect(`/quotes/${quote.id}`)
}

export const loader = async () => {
    const authors = await prisma.author.findMany()
    const users = await prisma.user.findMany()
    const content = await prisma.content.findMany()
    return {authors, users, content}
}

export default function NewQuote() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <h2>New quote</h2>
            <Form method="post"
                className="flex flex-col gap-4 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
            >
                <div>
                    <label>
                        Quote:
                    </label>
                    <input type="text" name="body" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                </div>
                <div>
                    <label>
                        Author:
                    </label>
                    <select name="authorId" className="bg-stone-700 rounded-sm">
                        {data.authors.map((author: any) => (
                            <option key={author.id}  value={author.id}>{author.firstName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="pb-1">
                        Content:
                    </label>
                    <select name="contentId" className="bg-stone-700 rounded-sm">
                        <option key='empty' value='null'></option>
                        {data.content.map((content: any) => (
                            <option key={content.id}  value={content.id}>{content.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>
                        User:
                    </label>
                    <select name="userId" className="bg-stone-700 rounded-sm">
                        {data.users.map((user: any) => (
                            <option key={user.id}  value={user.id}>{user.email}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <button type="submit" className="px-4 py-2 bg-blue-400 text-white">Add Quote</button>
                </div>
            </Form>
        </div>
    )
}