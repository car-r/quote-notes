import { Link } from "@remix-run/react";

export default function QuoteDetailCard({quote}: any) {
    return (
        <div className="md:col-span-2">
            <div className="p-4 mb-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60">
                <p className="text-xl text-center pb-6 italic font-semibold">"{quote.quote.body}"</p>
                <p className="font-light">
                    <Link to={`/authors/${quote.author.id}`}>
                        {quote.quote.authorName}
                    </Link>, <span className="font-thin"><Link to={`/content/${quote.content.id}`}>{quote.content.title}</Link></span>
                </p>
            </div>
        </div>
    )
}