import { Form, Link } from "@remix-run/react";
import { useState } from "react";

export default function BookEditCard({book, authors, actionData}: any) {
    const [showEditBook, setShowEditBook] = useState(false)
    // const [authorName, setAuthorName] = useState(content.authorName)
    // console.log(actionData)
    console.log('book edit card --> ', authors)

    // function onAuthorChange(e: any) {
    //     console.log(e.target.value)
    //     console.log(authors.length)
    //     for (const author of authors) {
    //         if (author.id === e.target.value) {
    //             console.log('its a match on ' + author.name)
    //             setAuthorName(author.name)
    //         }
    //         else {
    //             console.log('no match')
    //         }
    //     }
    // }
    return (
        <div className="p-4 border border-stone-800 bg-stone-800 rounded-md">
            {showEditBook ? 
                <div className="flex flex-col gap-4 md:w-80">
                    <Form method="post">
                        <div className="flex flex-col">
                            <button type="submit" name="_method" value="deleteBook" className="flex justify-end relative hover:text-stone-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold tracking-wider uppercase">
                                        Title
                                    </label>
                                    <input type="text" name="title" className="px-2 border border-stone-800 bg-stone-700 rounded" defaultValue={book.title}/>
                                    {actionData?.errors.title && (
                                        <p className="text-red-400 text-sm">{actionData.errors.title}</p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold tracking-wider uppercase">
                                        Author
                                    </label>
                                    <select name="selectAuthorId" className="bg-stone-700 rounded-sm p-1" >
                                        <option value={book.authorId}>{book.author.name}</option>
                                        {/* filter author out of map since it is displaed in option value above */}
                                        {authors.filter((author: any) => author.id !== book.authorId).map((author: any) => (
                                            <option key={author.id}  value={author.id}>{author.name}</option>
                                    ))}
                                    </select>
                                </div>
                        
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold tracking-wider uppercase">
                                        Image URL
                                    </label>
                                    <input type="text" name="imgUrl" className="px-2 border border-stone-800 bg-stone-700 rounded" defaultValue={book.imgUrl}/>
                                    {actionData?.errors.imgUrl && (
                                        <p className="text-red-400 text-sm">{actionData.errors.imgUrl}</p>
                                    )}
                                </div>
                                {/* <div className="hidden">
                                    <input type="hidden" name="selectAuthorName" value={authorName}/>
                                </div> */}
                                <div className="hidden">
                                    <input type="hidden" name="bookId" value={book.id}/>
                                </div>
                            </div>
                            <div className="flex flex-col mt-6">
                                <button type="submit" name="_method" value="update"  className="px-6 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded">
                                    Update Book
                                </button> 
                            </div>
                        </div>
                    </Form>
                    <div onClick={() => setShowEditBook(false)} 
                        className="border-2 border-stone-600 py-2 px-3 mt-2 rounded cursor-pointer hover:bg-stone-600">
                        <p className="text-center">Show Book Details</p>
                    </div>
                </div> 
            :
            <div> 
                <div className="pb-2">
                    <img src={book.imgUrl} alt={book.title}
                        onError={(e: any) => e.target.src = 'https://neelkanthpublishers.com/assets/bookcover_thumb.png'} 
                        className="object-fit md:max-w-xs"
                    />
                </div>
                <div>
                    <p className="font-bold">
                        {book.title}
                    </p>
                    <Link to={`/authors/${book.authorId}`}>     
                        <p className="text-sm font-thin tracking-wider hover:text-stone-100">
                            {book.author.name}
                        </p>  
                    </Link>             
                </div>
                <div className="flex flex-col mt-4">
                    <div onClick={() => setShowEditBook(!showEditBook)} 
                        className="px-4 py-2 border-2 border-blue-400 hover:bg-blue-400 text-white rounded text-center cursor-pointer">
                        Edit Book
                    </div>
                </div>
            </div>
            }
        </div>
    )
}