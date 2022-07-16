import { Form } from "@remix-run/react";
import { useState } from "react";

export default function QuoteEditCard({quote}: any) {
    const [showEditQuote, setShowEditQuote] = useState(false)
    return (
        <div className="flex flex-col gap-1 bg-stone-800 p-4 rounded-lg max-w-3xl mb-4">
            {showEditQuote ? 
                <div className="flex flex-col gap-4">
                    <Form method="post"
                        className="flex flex-col gap-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 font-light mt-2"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold tracking-wider uppercase">
                                    Quote
                                </label>
                                <textarea
                                    name="body"
                                    rows={2}
                                    className="w-full mb-2 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-sm" 
                                    defaultValue={quote.quote.body}
                                />
                                {/* <input type="text" name="name" className="px-2 border border-stone-800 bg-stone-700 rounded" defaultValue={quote.quote.body}/> */}
                            </div>
                        </div>           
                        <div className="flex justify-between overflow-hidden">
                            <button type="submit" name="_method" value="update" className="px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded">
                                Update
                            </button> 
                            <button type="submit" name="_method" value="delete" className="px-6 py-2 border border-red-500 text-white rounded hover:bg-red-700 flex">
                                Delete
                                
                            </button>
                        </div>
                    </Form>
                    {/* <Form method="post">
                        <button
                            name="_method"
                            value="delete"
                            className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600 flex w-full justify-center"
                        >
                            Delete Quote
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </Form> */}
                    <div onClick={() => setShowEditQuote(false)} 
                        className="px-4 py-2 border-2 border-blue-400 hover:bg-blue-400 text-white rounded text-center cursor-pointer">
                        Hide Edit Quote
                    </div>
                </div> 
                : 
                <div>
                    <div className="flex flex-col py-3 border-b border-stone-700 w-full">
                        <p className="text-sm font-semibold tracking-wider uppercase">Quote ID: </p>
                        <p className="truncate ..."><span className="font-thin text-lg truncate">{quote.quote.id}</span></p>
                    </div>
                    <div className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0">
                        <p className="text-sm font-semibold tracking-wider uppercase">Quote created</p>
                        <p><span className="font-thin text-lg">{quote.quote.createdAt}</span></p>
                    </div>
                    <div className="mt-6 flex flex-col">
                        <div onClick={() => setShowEditQuote(!showEditQuote)} 
                            className="px-4 py-2 border-2 border-blue-400 hover:bg-blue-400 text-white rounded text-center cursor-pointer">
                            Edit Quote
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}