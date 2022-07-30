import { useLoaderData, Link, useActionData } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import AddContentCard from "~/components/AddContentCard"
import AuthorRouteAuthorCard from "~/components/AuthorRouteAuthorCard"
import ContentCard from "~/components/ContentCard"
import PageTitle from "~/components/PageTitle"
import SectionTitle from "~/components/SectionTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);
    const author = await prisma.author.findUnique({
        where: { id: params.authorId }
    })
    const quotes = await prisma.quote.findMany({
        where: { userId: userId, authorId: params.authorId }
    })
    const favoriteQuotes = await prisma.quote.findMany({
        where: { userId: userId, authorId: params.authorId, isFavorited: {equals: "isFavorited"} }
    })
    const content = await prisma.content.findMany({
        where: { userId: userId, authorId: params.authorId}
    })
    const quoteNotes = await prisma.quoteNote.findMany({
        where: { userId: userId, authorId: params.authorId}
    })
    return {author, quotes, favoriteQuotes, content, quoteNotes}
}

export const action = async ({request, params}: any) => {
    const form = await request.formData()
    const name = form.get('name')
    const imgUrl = form.get('imgUrl')
    const userId = 'cl5j0h3ey00090bmf1xn3f4vo'

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

export default function AuthorDetail() {
    const data = useLoaderData()
    const actionData = useActionData()

    console.log(data)

    return (
        <div className="flex flex-col pt-10 max-w-4xl">
            <PageTitle children={data.author.name}/>
            <AuthorRouteAuthorCard author={data} actionData={actionData}/>
            <div className="mb-20">
                <SectionTitle children={'Content'}/>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                    {data.content.length < 1 ? 
                        <Link to={`/content/new`}
                        className="p-4 border border-stone-800 bg-stone-700 outline-dashed rounded-md text-stone-300/60"
                        >
                        <AddContentCard />
                    </Link> 
                    : 
                    <div>
                        {data.content.map((content: any) => (
                            <Link to={`/content/${content.id}`} key={content.id}>
                                <ContentCard content={content}/>
                            </Link>
                        ))}
                    </div>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                {data.favoriteQuotes.length > 0 ?
                <div>
                    <SectionTitle children={'Favorite Quotes'}/>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {data.favoriteQuotes.map((quote: any) => (
                            <Link to={`/quotes/${quote.id}`} key={quote.id}>
                                <div className="p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 ring-blue-400 hover:text-stone-100">
                                    <p className="text-xl text-center italic font-semibold">"{quote.body}"</p>
                                </div>
                            </Link>
                        ))}
                    </div> 
                </div>
                :
                <div>
                    <SectionTitle children={'Quotes'}/>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {data.quotes.map((quote: any) => (
                            <Link to={`/quotes/${quote.id}`} key={quote.id}>
                                <div className="p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 ring-blue-400 hover:text-stone-100">
                                    <p className="text-xl text-center italic font-semibold">"{quote.body}"</p>
                                </div>
                            </Link>
                        ))}
                    </div>  
                </div>
                } 
            </div> 
        </div>
    )
}