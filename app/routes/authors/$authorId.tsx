import { useLoaderData, Link, useActionData } from "@remix-run/react"
import { redirect } from "@remix-run/server-runtime"
import { useState } from "react"
// import AddContentCard from "~/components/AddBookCard"
import AddQuoteCard from "~/components/AddQuoteCard"
import AuthorRouteAuthorCard from "~/components/AuthorRouteAuthorCard"
import EditAuthorBtn from "~/components/Buttons/EditAuthorBtn"
// import BookCard from "~/components/BookCard"
import BookHomeCard from "~/components/BookHomeCard"
import PageTitle from "~/components/PageTitle"
import SectionTitle from "~/components/SectionTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import AddBookCard from "~/components/AddBookCard"

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);

    const author = await prisma.author.findUnique({
        where: { id: params.authorId },
        include: {
            _count: {
              select: {
                quote: true,
                book: true,
                quoteNote: true
              }
            },
            book: {
                include: {
                    author: true,
                }
            },
            quote: {
                where: {isFavorited: {equals: 'isFavorited'}}
            }
          }
    })

    return {author}
}

export const action = async ({request, params}: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const name = form.get('name')
    const imgUrl = form.get('imgUrl')

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
    const [edit, setEdit] = useState(false)
    console.log(data)

    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">            
            <PageTitle children={data.author.name} btn={<EditAuthorBtn author={data} edit={edit} setEdit={setEdit}/>}/>
            <AuthorRouteAuthorCard author={data} actionData={actionData} edit={edit} />
            <div className="mb-28">
                <SectionTitle children={'Books'}/>
                {data.author._count.book < 1 ?
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                        <Link to={`/books/new`}>
                            <AddBookCard />
                        </Link> 
                    </div>
                    :
                    <div className="flex overflow-auto pb-6 snap-x scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700 p-1 gap-4">
                        {data.author.book.map((book: any) => (
                            <Link to={`/books/${book.id}`} key={book.id}>
                                <BookHomeCard book={book}/>
                            </Link>
                        ))}
                    </div>
                }
            </div>
            <div className="flex flex-col pb-1 mb-28">
                {data.author._count.quote > 0 ?
                    <div>
                        <SectionTitle children={'Favorite Quotes'}/>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                            {data.author.quote.map((quote: any) => (
                                <Link to={`/quotes/${quote.id}`} key={quote.id} className="flex ">
                                    <div className=" flex flex-col justify-center p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 ring-blue-400 hover:text-stone-100">
                                        <p className="text-md text-center italic font-semibold">"{quote.body}"</p>
                                    </div>
                                </Link>
                            ))}
                        </div> 
                    </div>
                :
                <div>
                    <SectionTitle children={'Quotes'}/>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {data.author._count.quote < 1 ? <AddQuoteCard /> : 
                            data.quotes.map((quote: any) => (
                                <Link to={`/quotes/${quote.id}`} key={quote.id} className="">
                                    <div className="p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 ring-blue-400 hover:text-stone-100">
                                        <p className="text-lg text-center italic font-semibold ">"{quote.body}"</p>
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