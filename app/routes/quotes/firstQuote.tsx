import { useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import ContentCard from "~/components/ContentCard";
import FirstQuoteForm from "~/components/FirstQuoteForm";
import PageTitle from "~/components/PageTitle";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const action = async ({request}: any) => {
    const form = await request.formData()
    const userId = await requireUserId(request);
    const body = form.get('body')
    const name = form.get('name')
    const title = form.get('title')
    console.log(Object.fromEntries(form))

    const errors = {
        body: '',
        name: '',
        title: ''
    }

    function checkAuthorName(name: any) {
        if(!name || name.length < 3) {
            return errors.name = `Author name too short`
        }
    }

    checkAuthorName(name)

    function checkTitleName(title: any) {
        if(!title || title.length < 3) {
            return errors.title = `Title too short`
        }
    }

    checkTitleName(title)

    function checkBody(body: any) {
        if(!body || body.length < 4) {
            return errors.body = `Quote too short`
        }
    }

    checkBody(body)

    if (errors.body || errors.name || errors.title) {
        const values = Object.fromEntries(form)
        return { errors, values }
    }


    const author = await prisma.author.create({
        data: {
            name: name,
            userId: userId,
            
        }
        
    })

    const content = await prisma.content.create({
        data: {
            title: title,
            userId: userId,
            authorId: author.id
        }
    })

    const quote = await prisma.quote.create({
        data: {
            body: body,
            userId: userId,
            contentId: content.id,
            authorId: author.id
        }
    })

    return redirect(`/authors/${author.id}`)
}

export default function FirstQuote() {
    const actionData = useActionData()
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`First Quote`}/>
            <FirstQuoteForm actionData={actionData}/>
        </div>
    )
}