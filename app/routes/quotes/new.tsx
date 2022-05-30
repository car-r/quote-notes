import { redirect } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { prisma } from "~/db.server"

export const action = async ({request}: any) => {
    const form = await request.formData()
    const authorId = form.get('authorId')
    const body = form.get('body')
    const userId = form.get('userId')

    const fields = { authorId, body, userId }

    const quote = await prisma.quote.create({ data: fields})
    return redirect(`/quotes/${quote.id}`)
}

export const loader = async () => {
    const authors = prisma.author.findMany()
    const users = prisma.user.findMany()
    return authors
}

export default function NewQuote() {
    const authors = useLoaderData()
    console.log(authors)
    return (
        <div>
            <h2>New quote</h2>
            <Form method="post">
                <div>
                    <label>
                        Quote:
                    </label>
                    <input type="text" name="body" className="px-2 border border-neutral-200 rounded"/>
                </div>
                <div>
                    <label>
                        Author:
                    </label>
                    <select name="authorId">
                        {authors.map((author: any) => (
                            <option key={author.id}  value={author.id}>{author.firstName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label >Username leave blank</label>
                    <input name="userId" value="cl3ry91dn0005zkmfvg634jhh"/>
                </div>
                <div>
                    <button type="submit" className="px-4 py-2 bg-blue-400">Add Quote</button>
                </div>
            </Form>
        </div>
    )
}