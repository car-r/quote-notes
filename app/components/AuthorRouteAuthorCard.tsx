export default function AuthorRouteAuthorCard({author}: any) {
    const quotes = {title: 'Quotes', count: author.quotes.length}
    const favorites = {title: 'Favorites', count: author.favoriteQuotes.length}
    const contents = {title: 'Content', count: author.content.length}
    const detailArray = [contents, quotes, favorites]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col bg-stone-800 p-4 rounded-lg max-w-xl">
                <img src={author.author.imgUrl} className="h-72 w-auto object-cover max-w-72" alt={author.name}/>
            </div>
            <div className="flex flex-col gap-2 bg-stone-800 p-4 rounded-lg max-w-xl ">
                {detailArray.map((detail) => (
                    <div key={detail.title} className="flex flex-col py-4 border-b border-stone-700 w-full last:border-0">
                    <p >{detail.title}: <span className="font-thin">{detail.count}</span></p>
                    </div>
                ))}
            </div>
        </div>
    )
}