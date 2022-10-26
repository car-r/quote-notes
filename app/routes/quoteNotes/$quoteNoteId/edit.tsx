
import { useActionData, useLoaderData, useOutletContext } from "@remix-run/react"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { redirect } from "@remix-run/node";

import EditNoteCard from "~/components/EditNoteCard";

export const loader = async ({params}: any) => {
    const data = await prisma.quoteNote.findUnique({
        where: { id: params.quoteNoteId},
        include: {
            author: true,
        }
    })
    return {data}
}

export const action = async ({ request, params }: any) => {
    // const userId = await requireUserId(request);
    const form = await request.formData()
    // const formBody = form.get('body')
    const noteBody = form.get('noteBody')
    // const authorId = form.get('authorId')
    // const bookId = form.get('bookId')
    // const id = params.quoteId
    // const isFavorited = form.get('isFavorited')
    // const tagBody = form.get('tagBody')
    const date: any = new Date
    const updatedAt = date.toISOString()
    console.log(Object.fromEntries(form))

    // Action to delete quote
    if(form.get('_method') === 'delete') {
        await prisma.quoteNote.delete({ where: { id: params.quoteNoteId}})
        return redirect('/quoteNotes')
    }

    // Action to update quote
    if(form.get('_method') === 'update') {
        const body = noteBody

        const errors = {
            body: ''
        }
    
        // validation check to make sure body isn't less than 4 characters
        function checkBody(body: any) {
            if(!body || body.length < 4) {
                return errors.body = `Note too short`
            }
        }
    
        checkBody(body)
    
        if (errors.body) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = {body}
        await prisma.quoteNote.update({where: {id: params.quoteNoteId}, data: fields})
        return redirect(`/quoteNotes/${params.quoteNoteId}`)
    }
}

export default function EditNote() {
    const data = useLoaderData()
    const actionData = useActionData()
    const [setEdit]: any = useOutletContext()

    console.log('NoteId edit data --> ', data)
    
    return (
        <div>
            <EditNoteCard data={data} setEdit={setEdit} actionData={actionData}/>
        </div>
    )
}