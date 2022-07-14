import { Link } from "@remix-run/react"
export default function AuthorRouteAuthorCard({author}: any) {
    const quotes = {title: 'Quotes', count: author.quotes.length}
    const favorites = {title: 'Favorites', count: author.favoriteQuotes.length}
    const contents = {title: 'Content', count: author.content.length}
    const notes = {title: 'Notes', count: author.quoteNotes.length}
    const detailArray = [contents, quotes, notes]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-800 rounded-xl py-2">
            <div className="flex flex-col p-4 rounded-lg max-w-xl items-center">
                <img src={author.author.imgUrl} className="w-72 h-72 object-cover max-w-72 rounded-full" alt={author.name}/>
            </div>
            <div className="flex flex-col  p-4 rounded-lg max-w-3xl">
                <div className="mb-4">
                    {detailArray.map((detail) => (
                        <div key={detail.title} className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0 ">
                            <p className="text-sm font-semibold tracking-wider uppercase">{detail.title}</p>
                            <p><span className="font-thin text-2xl">{detail.count}</span></p>
                        </div>
                    ))}
                </div>
                <Link to={`/authors/${author.author.id}/edit`} className="px-4 py-2 bg-blue-400 text-white rounded text-center">Edit Author</Link>
            </div>
        </div>
    )
}