import { useActionData, useLoaderData, useOutletContext } from "@remix-run/react"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { redirect } from "@remix-run/node";

import { useEdit, useSetEdit } from "../$authorId";

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

type Props = {
    edit: boolean;
    setEdit: (edit: boolean) => void
}

export default function EditAuthor() {
    const data = useLoaderData()
    const actionData = useActionData()
    const [edit, setEdit]: any = useOutletContext()
    // const { edit } = useEdit()
    // const { setEdit } = useSetEdit()
    return (
        <div className="">
            <EditAuthorCard data={data} actionData={actionData} setEdit={setEdit} edit={edit}/>
        </div>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <div className='flex flex-col justify-center py-10 border border-red-500 text-red-500 rounded-lg text-center w-full'>
                <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
            </div>
        </div>
    );
}