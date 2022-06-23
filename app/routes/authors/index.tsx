
import { Link, useLoaderData } from "@remix-run/react"
import AuthorCard from "~/components/AuthorCard"
import { prisma } from "~/db.server"

export const loader = async () => {
    const authors = await prisma.author.findMany()
    return authors    
}

export default function AuthorsIndex() {
    const authors = useLoaderData()
    console.log(authors)
    return (
        <div className="flex flex-col pt-10">
            <h3 className="text-xl pb-6">Saved Authors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {authors.map((author: any) => (
                    <Link to={`/authors/${author.id}`} key={author.id} className="">
                        <AuthorCard author={author}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}