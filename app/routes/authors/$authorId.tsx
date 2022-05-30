import { useLoaderData } from "@remix-run/react"
import { prisma } from "~/db.server"

export const loader = async ({params}: any) => {
    const author = await prisma.author.findUnique({
        where: { id: params.authorId }
    })
    return author
}

export default function AuthorDetail() {
    const author = useLoaderData()
    return (
        <div>
            <h2>{author.firstName}</h2>
            
        </div>
    )
}