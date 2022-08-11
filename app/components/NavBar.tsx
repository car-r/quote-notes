import { Link } from "@remix-run/react"

export default function NavBar({toggle, isOpen}: any) {
    return (
        <div className="block  md:hidden">
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
                isOpen ? `min-h-screen z-50 w-full transform transition duration-200 ease-in-out md:hidden `
                : `min-h-screen absolute z-50  inset-y-0 transform -translate-y-full transition duration-300 ease-in-out md:hidden`
                }
                onClick={toggle}
            >
                <nav className="flex- flex-col py-4 bg-stone-900 shadow-sm hover:cursor-pointer">
                    <div className="flex flex-col text-center">
                        <Link to='/' >
                            <p className="font-bold text-2xl p-2 cursor-pointer mb-2 hover:text-stone-100">QuoteNotes</p>
                        </Link>
                        <div className="flex flex-col font-semibold gap-4">
                        <Link to='/quotes'>
                            <p className='text-xl p-2 rounded-md hover:ring-2 hover:ring-blue-400 hover:ease-in-out hover:duration-300 hover:text-slate-100 cursor-pointer'>
                                Quotes
                            </p>
                        </Link>
                        <Link to='/content'>
                            <p className='text-xl p-2 rounded-md hover:ring-2 hover:ring-blue-400 hover:ease-in-out hover:duration-300 hover:text-slate-100 cursor-pointer'>
                                Content
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
                    </div>
                </nav>
            </div>
        </div>
    )
}