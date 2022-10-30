
import { useActionData, useLoaderData, useOutletContext } from "@remix-run/react"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { redirect } from "@remix-run/node";

import EditNoteCard from "~/components/EditNoteCard";
import { useEdit } from "../$quoteNoteId";
import { useEffect } from "react";

export const loader = async ({params}: any) => {
    const data = await prisma.quoteNote.findUnique({
        where: { id: params.quoteNoteId},
        include: {
            author: true,
            quote: true
        }
    })
    return {data}
}

type ActionData = {
    errors?: {
      body?: string;
    };
};

export const action = async ({ request, params }: any) => {
    const form = await request.formData()
    const noteBody = form.get('noteBody')
    const quoteId = form.get('quoteId')
    const date: any = new Date
    const updatedAt = date.toISOString()
    console.log(Object.fromEntries(form))

    // Action to delete quote
    if(form.get('_method') === 'delete') {
        await prisma.quoteNote.delete({ where: { id: params.quoteNoteId}})
        return redirect(`/quotes/${quoteId}`)
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
        // return redirect(`/quoteNotes/${params.quoteNoteId}`)
        return redirect(`/quotes/${quoteId}`)
    }
}


export default function EditNote() {
    const data = useLoaderData()
    const actionData = useActionData() as ActionData
    const [edit, setEdit]: any = useOutletContext()
    console.log('NoteId edit data --> ', data)
    // let { edit } = useEdit()
    
    return (
        <div>
            <EditNoteCard data={data} setEdit={setEdit} edit={edit} actionData={actionData}/>
        </div>
    )
}