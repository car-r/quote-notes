import { useActionData, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
// import { useState } from "react";
import NewBookCard from "~/components/NewBookCard";
import PageTitle from "~/components/PageTitle";
// import NewContentCard from "~/components/NewBookCard";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const authors = await prisma.author.findMany({where: {userId: userId}})
    const users = await prisma.user.findMany()
    const book = await prisma.book.findMany({where: {userId: userId}})
    return {authors, users, book}
}

export const action = async ({request}: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    // const authorName = form.get('authorName')
    const authorId = form.get('authorId')
    const title = form.get('title')
    const imgUrl = form.get('imgUrl')

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

    // const fields = { authorName, authorId, title, imgUrl, userId }
    const fields = { authorId, title, imgUrl, userId }

    const book = await prisma.book.create({ data: fields})
    return redirect(`/books/${book.id}`)
}

export default function NewContent(): JSX.Element {
    const data = useLoaderData()
    // const [authorName, setAuthorName] = useState(data.authors[0].name)
    
    const actionData = useActionData()

    // function onAuthorChange(e: any) {
    //     console.log(e.target.value)
    //     console.log(data.authors.length)
    //     for (const author of data.authors) {
    //         if (author.id === e.target.value) {
    //             console.log('its a match on ' + author.name)
    //             setAuthorName(author.name)
    //         }
    //         else {
    //             console.log('no match')
    //         }
    //     }
    // }
    console.log(data)
    
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`New Book`}/>
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <NewBookCard data={data} actionData={actionData}/>
            </div>
        </div>
    )
}