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
    const authorName = form.get('name')
    const title = form.get('title')
    console.log(Object.fromEntries(form))

    const author = await prisma.author.create({
        data: {
            name: authorName,
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
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`First Quote`}/>
            <FirstQuoteForm />
        </div>
    )
}