import { useLoaderData, Link, useActionData } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import AddContentCard from "~/components/AddContentCard"
import AddQuoteCard from "~/components/AddQuoteCard"
import AuthorRouteAuthorCard from "~/components/AuthorRouteAuthorCard"
import ContentCard from "~/components/ContentCard"
import PageTitle from "~/components/PageTitle"
import SectionTitle from "~/components/SectionTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);

    const author = await prisma.author.findUnique({
        where: { id: params.authorId },
        include: {
            _count: {
              select: {
                quote: true,
                content: true,
                quoteNote: true
              }
            },
            content: true,
          }
    })

    const favoriteQuotes = await prisma.quote.findMany({
        where: { userId: userId, authorId: params.authorId, isFavorited: {equals: "isFavorited"} }
    })

    return {author, favoriteQuotes}
}

export const action = async ({request, params}: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const name = form.get('name')
    const imgUrl = form.get('imgUrl')
    // const userId = 'cl5j0h3ey00090bmf1xn3f4vo'

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
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <PageTitle children={data.author.name}/>
            <AuthorRouteAuthorCard author={data} actionData={actionData}/>
            <div className="mb-28">
                <SectionTitle children={'Content'}/>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                    {data.author._count.content < 1 ? 
                        <Link to={`/content/new`}>
                            <AddContentCard />
                        </Link> 
                    : 
                    <div>
                        {data.author.content.map((content: any) => (
                            <Link to={`/content/${content.id}`} key={content.id}>
                                <ContentCard content={content}/>
                            </Link>
                        ))}
                    </div>
                    }
                </div>
            </div>
            <div className="flex flex-col pb-1">
                {data.favoriteQuotes.length > 0 ?
                <div>
                    <SectionTitle children={'Favorite Quotes'}/>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {data.favoriteQuotes.map((quote: any) => (
                            <Link to={`/quotes/${quote.id}`} key={quote.id}>
                                <div className="p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 ring-blue-400 hover:text-stone-100">
                                    <p className="text-md text-center italic font-semibold">"{quote.body}"</p>
                                </div>
                            </Link>
                        ))}
                    </div> 
                </div>
                :
                <div>
                    <SectionTitle children={'Quotes'}/>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-28">
                        {data.quotes.length < 1 ? <AddQuoteCard /> : 
                            data.quotes.map((quote: any) => (
                                <Link to={`/quotes/${quote.id}`} key={quote.id}>
                                    <div className="p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 ring-blue-400 hover:text-stone-100">
                                        <p className="text-lg text-center italic font-semibold">"{quote.body}"</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>  
                </div>
                } 
            </div> 
        </div>
    )
}