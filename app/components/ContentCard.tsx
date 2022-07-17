export default function ContentCard({content}: any) {
    return (
        <div className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400">
            <div className="pb-2">
                <img src={content.imgUrl} alt={content.title} 
                    className="object-fit max-w-96"
                />
            </div>
            <div>
                <p className="font-bold">
                    {content.title}
                </p>     
                <p className="text-sm font-thin tracking-wider">
                    {content.authorName}
                </p>               
            </div>
        </div>
    )
}