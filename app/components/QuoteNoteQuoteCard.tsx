import { Link } from "@remix-run/react";

export default function QuoteNoteQuoteCard({quote}: any) {
    return (
        <div className="p-4  border border-stone-800 bg-stone-800 rounded-md hover:border-blue-400 hover:text-stone-100">
            <Link to={`/quotes/${quote.quote.id}`}>
                <p className="text-base text-center pb-6 italic font-semibold">"{quote.quote.body}"</p>
                <p className="font-light">
                    <Link to={`/authors/${quote.quote.authorId}`}>
                        {quote.quote.authorName}
                    </Link>
                </p>
            </Link>
        </div>
    )
}