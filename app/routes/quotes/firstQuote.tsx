import { useActionData, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
// import BookCard from "~/components/BookCard";
import FirstQuoteForm from "~/components/FirstQuoteForm";
import PageTitle from "~/components/PageTitle";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            _count: {
                select: {
                    quotes: true,
                    book: true
                }
            }
        }
    })
    return {user}
}

export const action = async ({request}: any) => {
    const form = await request.formData()
    const userId = await requireUserId(request);
    const body = form.get('body')
    const name = form.get('name')
    const title = form.get('title')
    const pricingPlan = form.get('pricingPlan') as string
    const quoteCount = form.get('quoteCount')  || 0
    const bookCount = form.get('bookCount')  || 0
    console.log(Object.fromEntries(form))

    const errors = {
        body: '',
        name: '',
        title: '',
        pricingPlan: ''
    }

    function validatePricingPlan() {
        if (pricingPlan === 'free' && quoteCount > 49) {
            return errors.pricingPlan = `Upgrade your Pricing Plan`
        } else if (pricingPlan === 'pro' && quoteCount > 199) {
            return errors.pricingPlan = `Upgrade your Pricing Plan`
        } else if (pricingPlan === 'free' && bookCount > 4) {
            return errors.pricingPlan = `Upgrade your Pricing Plan`
        } else if (pricingPlan === 'pro' && bookCount > 19) {
            return errors.pricingPlan = `Upgrade your Pricing Plan`
        }
    }
    validatePricingPlan()

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

    if (errors.body || errors.name || errors.title || errors.pricingPlan) {
        const values = Object.fromEntries(form)
        return { errors, values }
    }


    const author = await prisma.author.create({
        data: {
            name: name,
            userId: userId,
            
        }
        
    })

    const book = await prisma.book.create({
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
            bookId: book.id,
            authorId: author.id
        }
    })

    return redirect(`/authors/${author.id}`)
}

export default function FirstQuote() {
    const actionData = useActionData()
    const data = useLoaderData()
    console.log('firstquote',data)
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`First Quote`}/>
            <FirstQuoteForm actionData={actionData} data={data}/>
        </div>
    )
}