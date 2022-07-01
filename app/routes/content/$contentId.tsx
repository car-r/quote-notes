import { Form, Outlet, useLoaderData } from "@remix-run/react"
import { Link } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const content = await prisma.content.findUnique({
        where: { id: params.contentId }
    })
    const quotes = await prisma.quote.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        where: { contentId: params.contentId}
    })
    return {content, quotes}
}

export const action = async ({request}: any) => {
    const form = await request.formData()
    const authorId = form.get('authorId')
    const body = form.get('body')
    const userId = form.get('userId')
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
            <div className="pb-6">
                <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                {data.content.title} Quotes
                </h3>
            </div>
            <div className="grid grid-cols-1 md:flex gap-6 max-w-4xl">
                <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {data.quotes.map((quote: any) => (
                        <Link to={`/quotes/${quote.id}`} key={quote.id}>
                            <div className="p-4  border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400">
                                <p className="text-xl text-center pb-6 italic font-semibold">"{quote.body}"</p>
                                <p className="font-light"><Link to={`/authors/${quote.authorId}`}>{quote.authorName}</Link>, <span className="font-thin"><Link to={`/content/${quote.contentId}`}>{content.title}</Link></span></p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col order-first md:order-last">
                    <Form method="post"
                        className="flex flex-col gap-4 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
                    >
                        <div className="flex flex-col">
                            <label>
                                Quote:
                            </label>
                            <textarea
                            name="body"
                            rows={2}
                            className="min-w-xl mb-4 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-lg"
                        />
                            {/* <input type="text" name="body" className="px-2 border border-stone-800 bg-stone-700 rounded"/> */}
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
                        <div className="hidden">
                        <input type="hidden" name="userId" value='cl4kuy4wu0009lnmfgbvhhww8'/>
                        </div>
                        <div className="flex flex-col">
                            <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded">Add Quote</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}