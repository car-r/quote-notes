import { Link } from "@remix-run/react";

export default function QuoteNoteQuoteCard({quote}: any) {
    return (
        
            <div className="p-4  border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400">
                <p className="text-xl text-center pb-6 italic font-semibold">"{quote.quote.body}"</p>
                <p className="font-light"><Link to={`/authors/${quote.quote.authorId}`}>{quote.quote.authorName}</Link></p>
            </div>
        
    )
}