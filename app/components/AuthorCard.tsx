

export default function AuthorCard({author}: any) {
    return (
        <div className="">
            {/* <div className="flex bg-stone-800 rounded-2xl h-28 overflow-hidden hover:ring-2 ring-blue-400">
                <div className="">
                    <img src={author.imgUrl} alt={author.name} className="w-32 h-40 object-cover -ml-2 -mt-4"/>
                </div>
                <div className="p-4">
                    <p>{author.name}</p>
                </div>
            </div>     */}
            <div className="flex bg-stone-800 rounded-2xl p-4 overflow-hidden hover:ring-2 ring-blue-400 hover:text-stone-100 gap-2">
                <div className="">
                    <img src={author.imgUrl} alt={author.name}
                    onError={(e: any) => e.target.src = 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'}
                    className="w-20 h-20 xs:w-28 xs:h-28 object-cover mr-4 rounded-full"/>
                </div>
                <div className="py-2">
                    <p>{author.name}</p>
                </div>
            </div>            
        </div>
    )
}