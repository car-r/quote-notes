export default function AuthorRouteCard({author}: any) {
    return (
        <div className="flex flex-col rounded-lg w-full items-center border-2 border-stone-800 h-72">
            <div className="bg-stone-800 h-28 w-full rounded-t-md"></div>
            <img 
                src={author.author.imgUrl} 
                className="w-32 h-32 xs:w-40 xs:h-40 object-cover max-w-72 rounded-full absolute mt-12 xs:mt-8 " 
                alt={author.name}
                onError={(e: any) => e.target.src = 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'}
            />
            <p className="mt-auto text-base pb-6">{author.author.name}</p>
        </div>
    )
}