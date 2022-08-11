import { Link, useLoaderData } from "@remix-run/react";
import AuthorCard from "~/components/AuthorCard";
import SectionTitle from "~/components/SectionTitle";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";


export const loader = async ({request}: any) => {
  const userId = await requireUserId(request);
  const quotes = await prisma.quote.findMany({
    take: 3,
    where: {userId: userId, isFavorited: 'isFavorited'}
  })
  const content = await prisma.content.findMany({
    take: 3,
    where: {userId: userId}
  })
  const authors = await prisma.author.findMany({
    take: 3,
    where: {userId: userId}
  })

  return {quotes, content, authors}
}

export default function Index() {

  const data = useLoaderData()
  console.log(data)
  return (
   <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
      <div className="pb-20">
        <SectionTitle children={'Favorite Quotes'}/>
        <div className="flex">
          <div className="flex flex-col md:flex md:flex-row gap-4 ">
            {data.quotes.map((quote: any) => (
              <Link to={`/quotes/${quote.id}`} key={quote.id}
                className="flex flex-col w-full md:max-w-sm p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2 hover:ring-blue-400 hover:text-stone-100"
              >
                <p className="text-xl text-center pb-6 italic font-semibold ">"{quote.body}"</p>
                <p className="font-light mt-auto"><Link to={`/authors/${quote.authorId}`}>{quote.authorName}</Link></p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-20">
        <SectionTitle children={'Your Content'}/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {data.content.map((content: any) => (
            <Link to={`/content/${content.id}`} key={content.id}
            className="p-4 border border-stone-800 bg-stone-800 rounded-md hover:ring-2  hover:ring-blue-400 hover:text-stone-100"
            >
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
                    {content.authorName}
                </p>               
            </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="pb-20">
        <SectionTitle children={'Your Authors'}/>
        {/* <h3 className="text-xl pb-6">Your Authors</h3> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.authors.map((author: any) => (
            <Link to={`/authors/${author.id}`} key={author.id} className="">
              <AuthorCard author={author}/>
            </Link>
          ))}
        </div>
      </div>
   </div>
  );
}
