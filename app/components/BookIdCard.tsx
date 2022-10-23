import { Link } from "@remix-run/react";

export default function BookIdCard({data}: any) {
    return (
        <div className="p-4 bg-stone-800 rounded-lg">
            <div className="pb-2">
                <img src={data.data.book[0].imgUrl} alt={data.data.book[0].title}
                    onError={(e: any) => e.target.src = 'https://neelkanthpublishers.com/assets/bookcover_thumb.png'}
                    className="object-fit md:max-w-xs" />
            </div>
             <div>
                <p className="font-bold">
                    {data.data.book[0].title}
                </p>
                <Link to={`/authors/${data.data.book[0].authorId}`}>
                    <p className="text-sm font-thin tracking-wider hover:text-stone-100">
                        {data.data.book[0].author.name}
                    </p>
                </Link>
            </div>
        </div>
    )
}