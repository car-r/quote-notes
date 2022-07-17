import { Form, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import { prisma } from "~/db.server"
import { useState } from "react"
import NewAuthorCard from "~/components/NewAuthorCard";

export const action = async ({request}: any) => {
    const form = await request.formData()
    const name = form.get('name')
    const imgUrl = form.get('imgUrl')
    const userId = 'cl5j0h3ey00090bmf1xn3f4vo'

    const errors = {
        name: '',
        imgUrl: ''
    }

    function checkAuthorName(name: any) {
        if(!name || name.length < 3) {
            return errors.name = `Author name too short`
        }
    }

    checkAuthorName(name)

    const isValidImageUrl = new RegExp('(jpe?g|png|gif|bmp)$')

    const validateImageUrl = (value: string) => {
        if (!isValidImageUrl.test(value)) {
            errors.imgUrl = `Not valid Img URL`
        }
    }

    validateImageUrl(imgUrl)

    if (errors.name) {
        const values = Object.fromEntries(form)
        return { errors, values }
    }

    const fields = { name, imgUrl, userId }

    const author = await prisma.author.create({ data: fields})
    return redirect(`/authors/${author.id}`)
}

export default function NewAuthor() {
    const actionData = useActionData()
    console.log(actionData)
    return (
        <div className="flex flex-col pt-10 md:max-w-4xl pb-6">
            <div className="flex flex-col w-full md:grid md:grid-cols-4">
                <div className="col-span-4 pb-6">
                    <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                    New Author
                    </h3>
                </div>
                <div className="col-span-1">
                    <NewAuthorCard actionData={actionData}/>
                </div>
            </div>
        </div>
    )
}