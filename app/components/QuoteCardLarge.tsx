import { Form, Link } from "@remix-run/react";

export default function QuoteCardLarge({quote}: any) {

    console.log('quotecardlarge -->', quote)
    return (
        <div className="md:col-span-2">
            <div className="p-4 md:p-10  border border-stone-800 bg-stone-800 rounded-md text-stone-300/60">
                <Form method="post">
                    <div onClick={() => console.log('clicked')} className="flex justify-end mb-1">
                        {/* <div className="flex text-xs justify-end " >
                            <Link to={`/quotes/${quote.quote.id}/edit`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </Link>
                            <Link to={`/quotes/${quote.quote.id}/edit`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </Link>
                        </div> */}
                        <div className="flex flex-col mb-1">
                        <input type="hidden" name="id" value={quote.id}/>
                        {quote.quote.isFavorited === "isFavorited" ? <input type="hidden" name="isFavorited" value="notFavorited"/> : <input type="hidden" name="isFavorited" value="isFavorited"/>}
                            <button type="submit" name="_method" value="updateFavorite" className="hover:text-white">
                                {quote.quote.isFavorited === "isFavorited" ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-right" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>
                </Form>
                <p className="text-base sm:text-xl text-center pb-6 italic font-semibold my-5 md:my-10">
                    "{quote.quote.body}"
                </p>
                <div className="flex">
                    <img src={quote.quote.author.imgUrl} alt={quote.quote.author.name}
                    onError={(e: any) => e.target.src = 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'}
                    className=" w-14 h-14 md:w-20 md:h-20 object-cover mr-4 rounded-full"/>
                    <div className="text-sm sm:text-base flex flex-col justify-center gap-1">
                        <p className=" hover:text-stone-100">
                            <Link to={`/authors/${quote.quote.authorId}`} className="hover:text-stone-100">
                                {quote.quote.author.name}
                            </Link>
                        </p>
                        <p className="font-thin hover:text-stone-100">
                            <Link to={`/books/${quote.quote.bookId}`}>
                                {quote.quote.book.title}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}