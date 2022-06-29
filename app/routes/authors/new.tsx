import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import { prisma } from "~/db.server"
import { useState } from "react"

export const action = async ({request}: any) => {
    const form = await request.formData()
    const name = form.get('name')
    const imgUrl = form.get('imgUrl')
    const userId = 'cl4kuy4wu0009lnmfgbvhhww8'

    const fields = { name, imgUrl, userId }

    const author = await prisma.author.create({ data: fields})
    return redirect(`/authors/${author.id}`)
}

export default function NewAuthor() {
    return (
        <div className="flex flex-col pt-10 md:max-w-4xl pb-6">
            <div className="pb-6">
                <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                New Author
                </h3>
            </div>
            <Form method="post"
                className="flex flex-col gap-4 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label>
                            Author Name:
                        </label>
                        <input type="text" name="name" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label>
                            Image URL:
                        </label>
                        <input type="text" name="imgUrl" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                    </div>
                </div>           
                <div>
                    <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded">Create Author</button>
                </div>
            </Form>
        </div>
    )
}