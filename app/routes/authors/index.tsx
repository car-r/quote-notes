
import { Form, Link, useLoaderData } from "@remix-run/react"
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
        <div className="flex flex-col pt-10 max-w-4xl">
            <div className="pb-6">
                <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                Your Authors
                </h3>
            </div>
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