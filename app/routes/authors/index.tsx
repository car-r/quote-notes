
import { Link, useLoaderData } from "@remix-run/react"
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
                        <div className="flex bg-stone-800 rounded-2xl h-28 overflow-hidden hover:ring-2 ring-blue-400">
                            <div className="">
                                <img src={author.imgUrl} alt={author.name} className="w-32 h-40 object-cover -ml-2 -mt-4"/>
                            </div>
                            <div className="p-4">
                                <p>{author.name}</p>
                            </div>
                            
                        </div>                    
                    </Link>
                ))}
            </div>

        </div>
    )
}