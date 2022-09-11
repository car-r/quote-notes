export default function ContentHomeCard({content}: any) {
    return (
        <div className="p-4 flex flex-col w-56 md:w-72 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
            <div className="pb-2">
                <img src={content.imgUrl} alt={content.title}
                    onError={(e: any) => e.target.src = 'https://neelkanthpublishers.com/assets/bookcover_thumb.png'} 
                    className="object-fit w-64 h-80 md:h-96"
                />
            </div>
            <div>
                <p className="text-sm md:text-base font-bold">
                    {content.title}
                </p>     
                <p className="text-sm font-thin tracking-wider">
                    {content.authorName}
                </p>               
            </div>
        </div>
    )
}