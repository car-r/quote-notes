import { Outlet, useActionData, useCatch, useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import EditQuoteBtn from "~/components/Buttons/EditQuoteBtn";
import PageTitle from "~/components/PageTitle";
import QuoteBackBtn from "~/components/Buttons/QuoteBackBtn";
import QuoteNoteGrid from "~/components/QuoteNoteGrid";
import SectionTitle from "~/components/SectionTitle";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import QuoteCardLarge from "~/components/QuoteCardLarge";
import AddNoteCard from "~/components/AddNoteCard";
import QuoteTags from "~/components/QuoteTags";
import { redirect } from "@remix-run/server-runtime";
import QuoteErrorBackBtn from "~/components/Buttons/QuoteErrorBackBtn";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);
    const quote = await prisma.quote.findUnique({
        where: { id: params.quoteId},
        include: {
            tag: true, // Return all fields
            author: true,
            book: true,
            note: {
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
                
            }
        }
    })

    if (!quote) {
        throw new Response("Can't find quote.", {
            status: 404,
        })
    }
    
    return {quote}

    // const author = await prisma.author.findUnique({
    //     where: { id: quote?.authorId}
    // })

    // const book = await prisma.book.findUnique({
    //     where: { id: quote?.bookId}
    // })

    // const notes = await prisma.quoteNote.findMany({
    //     orderBy: [
    //         {
    //             createdAt: 'desc',
    //         },
    //     ],
    //     where: {quoteId: params.quoteId}
    // })
    // return {author, quote, book, notes}
    return {quote}
}

export const action = async ({ request, params }: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const formBody = form.get('body')
    const quoteBody = form.get('quoteBody')
    const authorId = form.get('authorId')
    const bookId = form.get('bookId')
    const id = params.quoteId
    const isFavorited = form.get('isFavorited')
    const tagBody = form.get('tagBody')
    const date: any = new Date
    const updatedAt = date.toISOString()
    console.log(Object.fromEntries(form))

    // Action to delete quote
    if(form.get('_method') === 'delete') {
        await prisma.quote.delete({ where: { id: params.quoteId}})
        return redirect('/quotes')
    }

    // Action to update quote
    if(form.get('_method') === 'update') {
        const body = quoteBody

        const errors = {
            body: ''
        }
    
        // validation check to make sure body isn't less than 4 characters
        function checkBody(body: any) {
            if(!body || body.length < 4) {
                return errors.body = `Quote too short`
            }
        }
    
        checkBody(body)
    
        if (errors.body) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = {body}
        await prisma.quote.update({where: {id: params.quoteId}, data: fields})
        return redirect('/quotes')
    }


    // Action to create a quoteNote
    if(form.get('_method') === 'note') {
        const body = formBody
        const quoteId = params.quoteId

        const errors = {
            noteBody: ''
        }
    
        function checkBody(body: any) {
            if(!body || body.length < 4) {
                return errors.noteBody = `Note too short`
            }
        }
    
        checkBody(body)
    
        if (errors.noteBody) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = { body, quoteId, userId, authorId, bookId}
        await prisma.quoteNote.create({ data: fields })

        // update the createdAt date when a new note is added to a quote
        await prisma.quote.update({
            where: {id: quoteId},
            data: { updatedAt: updatedAt}
        })

        return redirect(`/quotes/${params.quoteId}`)
    }

    // Action to add tag
    if(form.get('_method') === 'tag') {
        const oldBody: string = tagBody
        const quoteId: string = params.quoteId

        const errors = {
            tagBody: ''
        }

        const body = oldBody.replace(/\s+/g, '-').toLowerCase()

        function checkBody(body: any) {
            if(!body || body.length < 3) {
                return errors.tagBody = `Tag too short`
            }
        }
    
        checkBody(body)

    
        if (errors.tagBody) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = {body, quoteId, userId}
        await prisma.tag.create({ 
            data: fields
        })
        return redirect(`/quotes/${id}`)
    }
    
    // Action to delete tag
    if(form.get('_method') === 'deleteTag') {
        const values = Object.fromEntries(form)
        const tagId = form.get('tagId')  
        await prisma.tag.delete({ where: { id: tagId }})
        return redirect(`/quotes/${id}`)
    }

    // Action to update favorite status of quote
    if(form.get('_method') !== ('delete' || 'update' || 'note' || 'deleteTag' || 'tag') ) {
        await prisma.quote.update({
            where: { id: id },
            data: { isFavorited: isFavorited }
        })
        return redirect(`/quotes/${id}`)
    }

    
}


export default function QuoteDetail() {
    const quote = useLoaderData()
    const actionData = useActionData()
    const [edit, setEdit] = useState(false)

    console.log('quoteId route --> ', quote)
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            {edit ? 
                <PageTitle children={`Quote`} btn={<QuoteBackBtn  quote={quote} edit={edit} setEdit={setEdit}/>}/>
                :
                <PageTitle children={`Quote`} btn={<EditQuoteBtn  data={quote} edit={edit} setEdit={setEdit}/>}/>
            }
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Outlet context={ [edit, setEdit] }/>
                <div className="flex flex-col gap-6">
                    <AddNoteCard quote={quote} actionData={actionData} setEdit={setEdit}/>
                    <QuoteTags quote={quote} actionData={actionData} setEdit={setEdit}/>
                </div>
            </div>
            {/* <Outlet /> */}
            <div className="mt-20 mb-28">
                <SectionTitle children={"Notes"}/>
                <QuoteNoteGrid quote={quote}/>
            </div>
        </div>
    )
}

export function CatchBoundary() {
    const caught = useCatch();
    const params = useParams();
    if (caught.status === 404) {
      return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <PageTitle children={`Quote`} btn={<QuoteErrorBackBtn />}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                    <div className="p-4  border border-red-500 text-red-500 bg-stone-800 rounded-md ">
                        <p className="text-sm sm:text-xl text-center  italic font-semibold my-5 md:my-10">
                            {`Can't find quote ${params.quoteId}`}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-20 mb-28">
                <SectionTitle children={"Notes"}/>
            </div>
        </div>
      );
    }
    throw new Error(`Unhandled error: ${caught.status}`);
}