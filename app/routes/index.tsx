import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";


export const loader = async () => {
  const quotes = await prisma.quote.findMany()
  const content = await prisma.content.findMany()
  const authors = await prisma.author.findMany()

  return {quotes, content, authors}
}

export default function Index() {

  const data = useLoaderData()
  console.log(data)
  return (
   <div className="flex flex-col pt-10">
      <div className="pb-10">
        <h3 className="text-xl pb-6">Your Quotes</h3>
        <div className="flex gap-4 whitespace-nowrap overflow-x-scroll scrollbar-hide snap-x snap-mandatory">
          {data.quotes.map((quote: any) => (
            
            <Link to={`/quotes/${quote.id}`} key={quote.id}
            className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400 w-56"
            >
              <p className="text-xl text-center pb-6 italic font-semibold">"{quote.body}"</p>
              <p className="font-light"><Link to={`/authors/${quote.authorId}`}>{quote.authorName}</Link></p>
            </Link>
          ))}
        </div>
      </div>
      <div className="pb-10">
        <h3 className="text-xl pb-6">Your Content</h3>
        <div className="flex gap-4 scroll-auto snap-x snap-mandatory">
          {data.content.map((content: any) => (
            <Link to={`/content/${content.id}`} key={content.id}
            className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400 max-w-xs"
            >
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
            </Link>
          ))}
        </div>
      </div>
      <div className="pb-10">
        <h3 className="text-xl pb-6">Your Authors</h3>
        <div className="flex gap-4 scroll-auto snap-x snap-mandatory">
          {data.authors.map((author: any) => (
            <Link to={`/authors/${author.id}`} key={author.id} className="">
            <div className="flex bg-stone-800 rounded-2xl h-28 overflow-hidden hover:ring-2 ring-blue-400">
                <div className="">
                    <img src={author.imgUrl} alt={author.name} className="w-32 h-40 object-cover -ml-2 -mt-4"/>
                </div>
                <div className="p-4">
                    <p>{author.name}</p>
                </div>
                
            </div>                    
        </Link>
          ))}
        </div>
      </div>
   </div>
  );
}
