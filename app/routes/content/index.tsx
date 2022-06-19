import { Link, useLoaderData } from "@remix-run/react"
import { prisma } from "~/db.server"

export const loader = async () => {
    const data = prisma.content.findMany()
    return data
}

export default function ContentIndex() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <h2>Your Content</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.map((content: any) => (
                    <Link to={`/content/${content.id}`} key={content.id}
                    className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400"
                    >
                    <div>
                        <img src={content.imgUrl} alt={content.title} 
                            className="object-fit max-w-96"
                        />
                    </div>
                    {content.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}