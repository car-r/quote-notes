
import { Link, useLoaderData } from "@remix-run/react"
import AuthorCard from "~/components/AuthorCard"
import AddAuthorBtn from "~/components/Buttons/AddAuthorBtn";
import PageTitle from "~/components/PageTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const authors = await prisma.author.findMany({
        where: { userId: userId }
    })
    return authors    
}

export default function AuthorsIndex() {
    const authors = useLoaderData()
    const authorCount = authors.length
    console.log(authors)
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            {authorCount > 0 ? 
                <PageTitle children={`${authorCount} Authors`} btn={<AddAuthorBtn />}/>
                :
                <PageTitle children={`Authors`}/>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-1 ">
                {authors.map((author: any) => (
                    <Link to={`/authors/${author.id}`} key={author.id} className="">
                        <AuthorCard author={author}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}