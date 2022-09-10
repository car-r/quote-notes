export default function AuthorHomeCard({author}: any) {
    return (
        <div className="">
            <div className="flex w-64 md:w-80 bg-stone-800 rounded-2xl p-4 overflow-hidden hover:ring-2 ring-blue-400 hover:text-stone-100">
                <div className="">
                    <img src={author.imgUrl} alt={author.name}
                    onError={(e: any) => e.target.src = 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'}
                    className="w-32 h-32 object-cover mr-4 rounded-full"/>
                </div>
                <div className="py-2 ml-4">
                    <p>{author.name}</p>
                </div>
            </div>            
        </div>
    )
}