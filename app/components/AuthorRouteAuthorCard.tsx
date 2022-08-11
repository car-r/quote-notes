import { Form } from "@remix-run/react"
import { useState } from "react"

export default function AuthorRouteAuthorCard({author, actionData}: any) {
    const [showEditAuthor, setShowEditAuthor] = useState(false)
    const quotes = {title: 'Quotes', count: author.quotes.length}
    // const favorites = {title: 'Favorites', count: author.favoriteQuotes.length}
    const contents = {title: 'Content', count: author.content.length}
    const notes = {title: 'Notes', count: author.quoteNotes.length}
    const detailArray = [contents, quotes, notes]
    console.log(actionData)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  rounded-xl py-2 mb-20">
            <div className="flex flex-col p-4 rounded-lg max-w-xl items-center">
                <img 
                    src={author.author.imgUrl} 
                    className="w-72 h-72 object-cover max-w-72 rounded-full" 
                    alt={author.name}
                    onError={(e: any) => e.target.src = 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'}
                />
            </div>
            <div className="flex flex-col p-4 rounded-lg max-w-3xl">
                {showEditAuthor ? 
                <div className="flex flex-col  gap-4 min-h-full">
                    <Form method="post"
                        className="flex flex-col gap-6  rounded-md text-stone-300/60 font-light mt-2"
                    >
                        <div className="flex flex-col gap-4 md:gap-6">
                            <div className="flex flex-col gap-1 md:gap-2">
                                <label className="text-sm font-semibold tracking-wider uppercase">
                                    Author Name
                                </label>
                                {actionData?.errors.name ? (
                                    <div className="flex flex-col">
                                        <input type="text" name="name" className="px-2 py-1 border border-red-400 bg-stone-700 rounded" defaultValue={author.author.name}/>
                                        <p className="text-red-400 text-sm">{actionData.errors.name}</p>
                                    </div>
                                ) : 
                                    <input type="text" name="name" className="px-2 py-1 border border-stone-800 bg-stone-700 rounded w-full" defaultValue={author.author.name}/>
                                }
                            </div>
                            
                            <div className="flex flex-col gap-1 md:gap-2">
                                <label className="text-sm font-semibold tracking-wider uppercase">
                                    Image URL
                                </label>
                                {actionData?.errors.imgUrl ? (
                                    <div className="flex flex-col">
                                        <input type="text" name="imgUrl" className="px-2 py-1 border border-red-400 bg-stone-700 rounded" defaultValue={author.author.imgUrl}/>
                                        <p className="text-red-400 text-sm">{actionData.errors.imgUrl}</p>
                                    </div>
                                ) :
                                    <input type="text" name="imgUrl" className="px-2 py-1 border border-stone-800 bg-stone-700 rounded" defaultValue={author.author.imgUrl}/>
                                }
                            </div>
                        </div>           
                        <div className="flex flex-col gap-4 md:flex md:flex-row md:justify-between">
                            <button type="submit" className="px-6 py-2 bg-blue-400 text-white rounded hover:bg-blue-600">Update</button> 
                            <button type="submit" name="_method" value="delete" className="px-6 py-2 border border-red-500 text-white rounded hover:bg-red-700">Delete</button>
                        </div>
                    </Form>
                    <div className="mt-auto relative border-2 border-stone-600  py-2 px-3 rounded cursor-pointer hover:bg-stone-600" onClick={() => setShowEditAuthor(false)}>
                        <p className="text-center ">Show Author Stats</p>
                    </div>
                </div> 
                : 
                <div>
                    <div className="mb-3">
                        {detailArray.map((detail) => (
                            <div key={detail.title} className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0 ">
                                <p className="text-sm font-semibold tracking-wider uppercase">{detail.title}</p>
                                <p><span className="font-thin text-2xl">{detail.count}</span></p>
                            </div>
                        ))}
                    </div>
                    <div onClick={() => setShowEditAuthor(!showEditAuthor)} 
                        className="px-4 py-2 border-2 border-blue-400 bg-blue-400 text-white rounded text-center cursor-pointer hover:bg-stone-800">
                        Edit Author
                    </div>
                </div>
                }
            </div>
        </div>
    )
}