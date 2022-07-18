import { Form, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import { useState } from "react";
import NewContentCard from "~/components/NewContentCard";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async () => {
    const authors = await prisma.author.findMany()
    const users = await prisma.user.findMany()
    const content = await prisma.content.findMany()
    return {authors, users, content}
}

export const action = async ({request}: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const authorName = form.get('authorName')
    const authorId = form.get('authorId')
    const title = form.get('title')
    const imgUrl = form.get('imgUrl')
    // const userId = 'cl4kuy4wu0009lnmfgbvhhww8'

    const fields = { authorName, authorId, title, imgUrl, userId }

    const content = await prisma.content.create({ data: fields})
    return redirect(`/content/${content.id}`)
}

export default function NewContent(): JSX.Element {
    const data = useLoaderData()
    const [authorName, setAuthorName] = useState(data.authors[0].name)

    function onAuthorChange(e: any) {
        console.log(e.target.value)
        console.log(data.authors.length)
        for (const author of data.authors) {
            if (author.id === e.target.value) {
                console.log('its a match on ' + author.name)
                setAuthorName(author.name)
            }
            else {
                console.log('no match')
            }
        }
    }
    console.log(data)
    
    return (
        <div className="flex flex-col pt-10 md:max-w-4xl pb-6">
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="col-span-4 pb-6">
                    <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    New Content
                    </h3>
                </div>
                <NewContentCard data={data} onAuthorChange={onAuthorChange} authorName={authorName}/>
            </div>
        </div>
    )
}