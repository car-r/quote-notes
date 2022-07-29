import { Form, useLoaderData } from "@remix-run/react"
import { Link } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import PageTitle from "~/components/PageTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);
    const content = await prisma.content.findUnique({
        where: { id: params.contentId }
    })
    const quotes = await prisma.quote.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        where: { userId: userId, contentId: params.contentId}
    })
    return {content, quotes}
}

export const action = async ({request}: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const authorId = form.get('authorId')
    const body = form.get('body')
    const contentId = form.get('contentId')
    const authorName = form.get('authorName')

    const fields = { authorId, body, userId, contentId, authorName }

    const quote = await prisma.quote.create({ data: fields})
    return redirect(`/content/${contentId}`)
}

export default function AuthorDetail() {
    const data = useLoaderData()
    const content = data.content
    console.log(data)
    return (
        <div className="flex flex-col pt-10">
            <PageTitle children={`${data.content.title} Quotes`}/>
            <div className="grid grid-cols-1 md:flex gap-6 max-w-6xl">
                {data.quotes.length < 1 ? null : 
                    <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-1 lg:grid-cols-2">
                        {data.quotes.map((quote: any) => (
                            <Link to={`/quotes/${quote.id}`} key={quote.id}>
                                <div className="p-4  border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400 hover:text-stone-100">
                                    <p className="text-xl text-center pb-6 italic font-semibold">"{quote.body}"</p>
                                    <p className="font-light"><Link to={`/authors/${quote.authorId}`}>{quote.authorName}</Link>, <span className="font-thin"><Link to={`/content/${quote.contentId}`}>{content.title}</Link></span></p>
                                </div>
                            </Link>
                        ))}
                        
                    </div>
                }
                <div className="flex flex-col order-first md:order-last">
                    <Form method="post"
                        className="flex flex-col gap-4 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
                    >
                        <div className="flex flex-col">
                            <label></label>
                            <textarea
                            name="body"
                            rows={2}
                            className="min-w-xl mb-4 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-lg"
                            />
                        </div>
                        <div className="hidden">
                            <input type="hidden" name="authorId" value={content.authorId}/>
                        </div>
                        <div className="hidden">
                            <input type="hidden" name="authorName" value={content.authorName}/>
                        </div>
                        <div className="hidden">
                            <input type="hidden" name="contentId" value={content.id}/>
                        </div>

                        <div className="flex flex-col">
                            <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded flex justify-center">
                                Add Quote
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}