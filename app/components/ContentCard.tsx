export default function ContentCard({content}: any) {
    console.log('content card --> ', content)
    return (
        <div className="p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
            <div className="pb-2">
                <img src={content.imgUrl} alt={content.title}
                    onError={(e: any) => e.target.src = 'https://neelkanthpublishers.com/assets/bookcover_thumb.png'} 
                    className="object-fit max-w-96"
                />
            </div>
            <div>
                <p className="font-bold">
                    {content.title}
                </p>     
                <p className="text-sm font-thin tracking-wider">
                    {content.author.name}
                </p>               
            </div>
        </div>
    )
}