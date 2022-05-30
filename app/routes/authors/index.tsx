
import { Link, useLoaderData } from "@remix-run/react"
import { prisma } from "~/db.server"

export const loader = async () => {
    const authors = await prisma.author.findMany()
    return authors    
}

export default function AuthorsIndex() {
    const authors = useLoaderData()
    return (
        <div>
            <h1>Authors Index</h1>
            <div className="grid grid-cols-1 gap-4">
                {authors.map((author: any) => (
                    <Link to={`/authors/${author.id}`} key={author.id}>
                        {author.firstName}
                    </Link>
                ))}
            </div>

        </div>
    )
}