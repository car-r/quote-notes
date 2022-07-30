
import { Link, useLoaderData } from "@remix-run/react"
import AddAuthorCard from "~/components/AddAuthorCard"
import AuthorCard from "~/components/AuthorCard"
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
    console.log(authors)
    return (
        <div className="flex flex-col pt-10 max-w-5xl">
            <PageTitle children={`Your Authors`}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/authors/new" className="hover:text-stone-100">
                    <AddAuthorCard />           
                </Link>
                {authors.map((author: any) => (
                    <Link to={`/authors/${author.id}`} key={author.id} className="">
                        <AuthorCard author={author}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}