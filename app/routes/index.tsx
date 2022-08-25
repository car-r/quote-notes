import { Link, useLoaderData } from "@remix-run/react";
import AuthorCard from "~/components/AuthorCard";
import SectionTitle from "~/components/SectionTitle";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AddAuthorCard from "~/components/AddAuthorCard";
import AddContentCard from "~/components/AddContentCard";
import AddQuoteCard from "~/components/AddQuoteCard";
import PageTitle from "~/components/PageTitle";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const groupQuotes = await prisma.quote.groupBy({
    where: {userId: userId},
    by: ['authorName'],
    _count: {_all: true}
  })

  return {quotes, content, authors, groupQuotes}
}



export default function Index() {

  const data = useLoaderData()
  const authorList = data.groupQuotes.map((author: any) => (author.authorName))
  const quoteCountList = data.groupQuotes.map((quote: any) => (quote._count._all))
  console.log(data, authorList, quoteCountList)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Quotes By Author'
      }
    }
  }
  const barData = {
    labels: authorList,
    datasets: [{label: '# of Quotes',
      data: quoteCountList,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderWidth: 1,
      maxBarThickness: 100,
    }]
  }
  return (
   <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
      <PageTitle children={`Dashboard`}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-32">
        <div className="border-2 border-stone-800 p-4 rounded-xl">
          <p className="uppercase text-sm font-light tracking-wider">Quotes</p>
          <p className="text-4xl">{`25`}</p>
        </div>
        <div className="border-2 border-stone-800 p-4 rounded-xl">
          <p className="uppercase text-sm font-light tracking-wider">Authors</p>
          <p className="text-4xl">{`25`}</p>
        </div>
        <div className="border-2 border-stone-800 p-4 rounded-xl">
          <p className="uppercase text-sm font-light tracking-wider">Content</p>
          <p className="text-4xl">{`25`}</p>
        </div>
        <div className="border-2 border-stone-800 p-4 rounded-xl">
          <p className="uppercase text-sm font-light tracking-wider">Notes</p>
          <p className="text-4xl">{`25`}</p>
        </div>
      </div>
      <div className="pb-20 flex flex-col">
        {quoteCountList.length > 0 ? 
          <div className="pb-32 w-full flex flex-col overflow-hidden">
            <Bar
              data={barData}
              options={options}
            />
          </div>
        :
        null
        }
        <SectionTitle children={'Favorite Quotes'}/>
        <div className="flex">
          {data.quotes.length > 0 ?
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
            :
            <div className="flex flex-col md:flex md:flex-row gap-4 ">
              <Link to="/quotes/new">
                <AddQuoteCard />
              </Link>
            </div>
          }
        </div>
      </div>
      <div className="pb-20">
        <SectionTitle children={'Your Content'}/>
        {data.content.map > 0 ?
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
          :
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <Link 
              to={`/content/new`}
              className="p-4 border border-stone-800 bg-stone-700 outline-dashed rounded-md text-stone-300/60 hover:outline-blue-400">
              <AddContentCard />
            </Link>
          </div>
        }
      </div>
      <div className="pb-20">
        <SectionTitle children={'Your Authors'}/>
        {data.authors.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.authors.map((author: any) => (
                <Link to={`/authors/${author.id}`} key={author.id} className="">
                  <AuthorCard author={author}/>
                </Link>
              ))}
          </div>
          :
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/authors/new" className="hover:text-stone-100">
              <AddAuthorCard />           
            </Link>
          </div>
        }
      </div>
   </div>
  );
}
