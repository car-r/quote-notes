import { useActionData, useLoaderData, useOutletContext } from "@remix-run/react"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { redirect } from "@remix-run/node";

import EditAuthorCard from "~/components/EditAuthorCard"

export const loader = async ({params}: any) => {
    const data = await prisma.author.findUnique({
        where: { id: params.authorId},
        
    })
    return {data}
}

export const action = async ({request, params}: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const name = form.get('name')
    const imgUrl = form.get('imgUrl')

    const fields = { name, imgUrl, userId }

    if(form.get('_method') === 'delete') {
        await prisma.author.delete({ where: { id: params.authorId}})
        return redirect('/authors')
    }

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
            return errors.imgUrl = `Not a valid Image URL`
        }
    }

    validateImageUrl(imgUrl)

    if (errors.name || errors.imgUrl) {
        const values = Object.fromEntries(form)
        return { errors, values }
    }

    const author = await prisma.author.update({where: {id: params.authorId}, data: fields})
    return redirect(`/authors/${author.id}`)
}

export default function EditAuthor() {
    const data = useLoaderData()
    const actionData = useActionData()
    const [setEdit]: any = useOutletContext()
    return (
        <div className="">
            <EditAuthorCard data={data} actionData={actionData} setEdit={setEdit}/>
        </div>
    )
}