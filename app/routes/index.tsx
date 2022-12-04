import { Link, useLoaderData } from "@remix-run/react";
import SectionTitle from "~/components/SectionTitle";
import { prisma } from "~/db.server";
import { getUser, requireUserId } from "~/session.server";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// import { Bar } from 'react-chartjs-2';
import AddAuthorCard from "~/components/AddAuthorCard";
import AddQuoteCard from "~/components/AddQuoteCard";
// import AddContentCard from "~/components/AddContentCard";
import PageTitle from "~/components/PageTitle";
import QuoteSmallCard from "~/components/QuoteSmallCard";
import AuthorHomeCard from "~/components/AuthorHomeCard";
import AddFirstQuoteCard from "~/components/AddFirstQuoteCard";
import BookHomeCard from "~/components/BookHomeCard";
import AddBookCard from "~/components/AddBookCard";
// import QuoteErrorBackBtn from "~/components/Buttons/QuoteErrorBackBtn";

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
  const user = await getUser(request)
  const quotes = await prisma.quote.findMany({
    take: 7,
    where: {userId: userId, isFavorited: 'isFavorited'},
    orderBy: {
      note: {
        '_count': 'desc'
      }
    }
  })

  const book = await prisma.book.findMany({
    take: 4,
    where: {userId: userId},
    orderBy: {
      quote: {
        '_count': 'desc'
      }
    },
    include: {
      author: true
    }
  })
  const authors = await prisma.author.findMany({
    take: 4,
    where: {userId: userId},
    orderBy: {
      quote: {
        '_count': 'desc'
      }
    }
  })

  // const groupQuotes = await prisma.quote.groupBy({
  //   where: {userId: userId},
  //   by: ['authorName'],
  //   _count: {_all: true},
    
  // })

  const groupQuotes = await prisma.author.findMany({
    where: {userId: userId},
    take: 4,
    orderBy: {
      quote: {
        '_count': 'desc'
      }
    },
    include: {
      _count: {
        select: {
          quote: true,
        },
      }
    }
  })

  const userData = await prisma.user.findUnique({
    where: {id: userId},
    include: {
      _count: {
        select: {
          quotes: true,
          authors: true,
          book: true,
          quoteNote: true
        }
      },
      quotes: {
        take: 10,
        orderBy: {
          note: {
            '_count': 'desc'
          }
        }
      },
      authors: {
        orderBy: {
          quote: {
            '_count': 'desc'
          }
        }
      },
      book: {
        orderBy: {
          quote: {
            '_count': 'desc'
          }
        },
        include: {
          author: true
        }
      },
      quoteNote: true,
    }
  })

  return {quotes, book, authors, groupQuotes, userData, user, userId}
}



export default function Index() {

  const data = useLoaderData()
  // const authorList = data.groupQuotes.map((author: any) => (author.authorName))
  // const quoteCountList = data.groupQuotes.map((quote: any) => (quote._count._all))
  const authorList = data.groupQuotes.map((author: any) => (author.name))
  const quoteCountList = data.groupQuotes.map((quote: any) => (quote._count.quote))
  console.log('main index route -> ', data, authorList, quoteCountList)
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //       position: 'top' as const,
  //       labels: {
  //         // This more specific font property overrides the global property
  //         font: {
  //             size: 12
  //         }
  //       }
  //     },
  //     title: {
  //       display: true,
  //       text: 'Quotes By Author',
  //       font: {
  //         size: 16
  //     }
  //     }
  //   }
  // }
  // const barData = {
  //   labels: authorList,
  //   datasets: [{label: '# of Quotes',
  //     data: quoteCountList,
  //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     borderWidth: 1,
  //     maxBarThickness: 75
  //   }]
  // }
  return (
    <>
      {!data.userData ? <div>Home Page</div> : 
      <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
        <PageTitle children={`Dashboard`}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-28">
          <Link to="/quotes">
            <div className="border-2 border-stone-800 p-4 rounded-xl hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
              <p className="uppercase text-sm font-light tracking-wider">Quotes</p>
              <p className="text-4xl">{data.userData._count.quotes}</p>
            </div>
          </Link>
          <Link to="/books">
            <div className="border-2 border-stone-800 p-4 rounded-xl hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
              <p className="uppercase text-sm font-light tracking-wider">Books</p>
              <p className="text-4xl">{data.userData._count.book}</p>
            </div>
          </Link>
          <Link to="/authors">
            <div className="border-2 border-stone-800 p-4 rounded-xl hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
              <p className="uppercase text-sm font-light tracking-wider">Authors</p>
              <p className="text-4xl">{data.userData._count.authors}</p>
            </div>
          </Link>
          <Link to="/quoteNotes">
            <div className="border-2 border-stone-800 p-4 rounded-xl hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
              <p className="uppercase text-sm font-light tracking-wider">Notes</p>
              <p className="text-4xl">{data.userData._count.quoteNote}</p>
            </div>
          </Link>
        </div>
        <div className="pb-28 flex flex-col">
          {data.quotes.length > 0 ? 
            <div>
              <SectionTitle children={'Favorite Quotes'}/>
              <div className="flex overflow-auto pb-4 snap-x scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                <div className="flex md:flex md:flex-row gap-4 mx-1">
                  {data.quotes.map((quote: any) => (
                    <Link to={`/quotes/${quote.id}`} key={quote.id} className="snap-start px-1">
                      <QuoteSmallCard quote={quote}/>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            : data.userData.quotes.length > 0 ?
            <div>
              <SectionTitle children={'Quotes'}/>
              <div className="flex overflow-auto pb-4 snap-x scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                <div className="flex md:flex md:flex-row gap-4 mx-1">
                  {data.userData.quotes.map((quote: any) => (
                    <Link to={`/quotes/${quote.id}`} key={quote.id} className="snap-start px-1">
                      <QuoteSmallCard quote={quote}/>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            : data.userData.book.length > 0 ?
            <div>
              <SectionTitle children={'Quotes'}/>
              <div className="flex md:flex md:flex-row gap-4 mx-1">
                <Link to="/quotes/new" className="p-1">
                  <AddQuoteCard />
                </Link>
              </div>
            </div>
            :
            <div>
              <SectionTitle children={'Quotes'}/>
              <div className="flex md:flex md:flex-row gap-4 mx-1">
                <Link to="/quotes/new" className="p-1">
                  <AddFirstQuoteCard />
                </Link>
              </div>
            </div>
          }
        </div>
        <div className="pb-28">
          <SectionTitle children={'Books'}/>
          {data.userData.book.length > 0 ?
            <div className="flex overflow-auto pb-6 snap-x scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700 p-1 gap-4 ">
              {data.userData.book.map((book: any) => (
                <Link to={`/books/${book.id}`} key={book.id} className="flex">
                  <BookHomeCard book={book} />
                </Link>
              ))}
            </div>
            :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              <Link to={`/books/new`}>
                <AddBookCard />
              </Link>
            </div>
          }
        </div>
        <div className="pb-28">
          <SectionTitle children={'Top Authors'}/>
          {data.userData.authors.length > 0 ?
            <div className="flex gap-4 overflow-auto pb-6 snap-x scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700 p-1">
              {data.userData.authors.map((author: any) => (
                  <Link to={`/authors/${author.id}`} key={author.id} className=" snap-start px-1">
                    {/* <AuthorCard author={author}/> */}
                    <AuthorHomeCard author={author}/>
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
      }
   </>
  );
}

