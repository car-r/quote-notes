import { Form, Link, useLoaderData } from "@remix-run/react"
import { requireUserId } from "~/session.server";

export const loader = async ( {request}: any ) => {
    const userId = await requireUserId(request);
    return {userId}

}

export default function NavBar({toggle, isOpen}: any) {
    const data = useLoaderData()
    console.log('navbar data ->', data)
    console.log((data.user === null ? 'true' : 'false'))

    const links = [
        {title: 'Quotes', route: '/quotes', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>},
        {title: 'Books', route: '/books', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>},
        {title: 'Authors', route: '/authors', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>},
        {title: 'Notes', route: '/quoteNotes', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>},
        {title: data.user.email , route: '/quotes', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      },
    ]

    
    return (
        <div className="block sticky top-0 bg-stone-900/90 w-full lg:hidden">
            <div onClick={() => toggle(!isOpen)} className="cursor-pointer pt-4">
                {!isOpen ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                }
            </div>
            <div className={
                isOpen ? `min-h-screen z-50 w-full transform transition duration-200 ease-in-out lg:hidden `
                : `min-h-screen absolute z-50  inset-y-0 transform -translate-y-full transition duration-300 ease-in-out lg:hidden`
                }
                onClick={toggle}
            >
                <nav className="flex flex-col gap-2 py-4 bg-stone-900 shadow-sm hover:cursor-pointer">
                    {/* <div className="flex flex-col text-center">
                        <Link to='/' >
                            <p className="font-bold text-2xl p-2 cursor-pointer mb-2 hover:text-stone-100">QuoteNotes</p>
                        </Link>
                        <div className="flex flex-col font-semibold gap-4">
                        <Link to='/quotes'>
                            <p className='text-xl p-2 rounded-md hover:ring-2 hover:ring-blue-400 hover:ease-in-out hover:duration-300 hover:text-slate-100 cursor-pointer'>
                                Quotes
                            </p>
                        </Link>
                        <Link to='/books'>
                            <p className='text-xl p-2 rounded-md hover:ring-2 hover:ring-blue-400 hover:ease-in-out hover:duration-300 hover:text-slate-100 cursor-pointer'>
                                Books
                            </p>
                        </Link>
                        <Link to='/authors'>
                            <p className='text-xl p-2 rounded-md hover:ring-2 hover:ring-blue-400 hover:ease-in-out hover:duration-300 hover:text-slate-100 cursor-pointer'>
                                Authors
                            </p>
                        </Link>
                        <Link to='/quoteNotes'>
                            <p className='text-xl p-2 rounded-md hover:ring-2 hover:ring-blue-400 hover:ease-in-out hover:duration-300 hover:text-slate-100 cursor-pointer'>
                                Notes
                            </p>
                        </Link>
                        </div>
                    </div> */}
                    {links.map((link) => (
                        <Link to={`${link.route}`} key={link.title} 
                            className="flex gap-4 items-center  text-xl p-2 rounded-md hover:ring-2 hover:ring-blue-400 hover:ease-in-out hover:duration-300 hover:text-slate-100 cursor-pointer">
                            <div>{link.icon}</div>
                            <p className=''>
                                {link.title}
                            </p>
                        </Link>
                    ))}
                    <Form action="/logout" method="post">
                        <div className="flex py-1 px-3 border border-stone-900 rounded-md hover:border-blue-400 hover:text-stone-100 ">
                            <button
                                className="flex font-semibold"
                                type="submit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </Form>
                </nav>
            </div>
        </div>
    )
}