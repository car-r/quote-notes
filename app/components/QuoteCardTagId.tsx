import { Form, Link } from "@remix-run/react";

export default function QuoteCardTagId({quote}: any) {
    console.log('quoteCardTagId --> ', quote)
    return (
        <div key={quote.id} className="flex">
            <div className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
                <div className="flex flex-col min-h-full">
                    <Form method="post">
                        <div onClick={() => console.log('clicked')} className="flex justify-end mb-2">   
                            <div className="flex flex-col">
                            <input type="hidden" name="id" value={quote.quoteId}/>

                            {quote.quote.isFavorited === "isFavorited" ? <input type="hidden" name="isFavorited" value="notFavorited"/> : <input type="hidden" name="isFavorited" value="isFavorited"/>}
                                <button type="submit" >
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
                    <Link to={`/quotes/${quote.quoteId}`} className="flex flex-col flex-1 min-h-full justify-center mb-6">
                        <div className=" ">
                                <p className="text-lg text-center italic font-semibold">"{quote.quote.body}"</p>
                        </div>
                    </Link>
                    <div className="flex mt-auto">
                        <div className="text-sm font-light tracking-wide">
                            <p className="font-light">
                                <Link to={`/authors/${quote.quote.authorId}`} className="hover:text-stone-100">
                                    {quote.quote.author.name}
                                </Link>, <span className="font-thin hover:text-stone-100"><Link to={`/books/${quote.quote.book.id}`}>{quote.quote.book.title}</Link></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}