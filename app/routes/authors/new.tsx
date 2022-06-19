import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import { prisma } from "~/db.server"
import { useState } from "react"

export const action = async ({request}: any) => {
    const form = await request.formData()
    const firstName = form.get('firstName')
    const lastName = form.get('lastName')
    const userId = 'cl3s9mghr000235mfaooaaqcb'

    const fields = { firstName, lastName, userId }

    const author = await prisma.author.create({ data: fields})
    return redirect(`/authors/${author.id}`)
}

export default function NewAuthor() {
    return (
        <div>
            <h2>New Author</h2>
            <Form method="post"
                className="flex flex-col gap-4 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
            >
                <div>
                    <label>
                        Author First Name:
                    </label>
                    <input type="text" name="firstName" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                </div>
                <div>
                    <label>
                        Author Last Name:
                    </label>
                    <input type="text" name="lastName" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                </div>            
                <div>
                    <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded">Create Author</button>
                </div>
            </Form>
        </div>
    )
}