import { Form } from "@remix-run/react"

export default function AuthorRouteAuthorCard({author, edit, actionData}: any) {
    const quotes = {title: 'Quotes', count: author.author._count.quote}
    const books = {title: 'Book', count: author.author._count.book}
    const notes = {title: 'Notes', count: author.author._count.quoteNote}
    const detailArray = [books, quotes, notes]
    console.log(actionData)
    console.log('author route card --> ', author)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  rounded-xl py-2 mb-20">
            <div className="flex flex-col p-4 rounded-lg w-full items-center">
                <img 
                    src={author.author.imgUrl} 
                    className=" w-56 h-56 sm:w-72 sm:h-72 object-cover max-w-72 rounded-full" 
                    alt={author.name}
                    onError={(e: any) => e.target.src = 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'}
                />
            </div>
            <div className="flex flex-col p-4 rounded-lg max-w-3xl">
                {edit ? 
                <div className="flex flex-col gap-4 min-h-full justify-center">
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
                                    Author Image URL
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
                </div> 
                : 
                <div className="flex flex-col sm:h-full sm:justify-center">
                    <div className="mb-3">
                        {detailArray.map((detail) => (
                            <div key={detail.title} className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0 ">
                                <p className="text-sm font-semibold tracking-wider uppercase">{detail.title}</p>
                                <p><span className="font-thin text-2xl">{detail.count}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}