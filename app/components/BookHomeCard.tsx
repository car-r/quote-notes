export type Book = {
    book: {
        title: string
        imgUrl: string
        author: {
            name: string
        }
    }
}

// This function is triggered if an error occurs while loading an image
const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://neelkanthpublishers.com/assets/bookcover_thumb.png';
    event.currentTarget.className = "error";
};

export default function BookHomeCard({book}: Book) {
    console.log('book Home Card --> ', book)
    return (
        <div className="p-4 flex flex-col w-56 md:w-72 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
            <div className="pb-2">
                {/* <img src={book.imgUrl} alt={book.title}
                    onError={(e: any) => e.target.src = 'https://neelkanthpublishers.com/assets/bookcover_thumb.png'} 
                    className="object-fit w-64 h-80 md:h-96"
                /> */}
                <img src={book.imgUrl} alt={book.title}
                    onError={imageOnErrorHandler} 
                    className="object-fit w-64 h-80 md:h-96"
                />
            </div>
            <div>
                <p className="text-sm md:text-base font-bold">
                    {book.title}
                </p>     
                <p className="text-sm font-thin tracking-wider">
                    {book.author.name}
                </p>               
            </div>
        </div>
    )
}