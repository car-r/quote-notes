import { Form } from "@remix-run/react";
import { useState } from "react";

export default function QuoteEditCard({quote, actionData}: any) {
    console.log(actionData)
    const [showEditQuote, setShowEditQuote] = useState(false)
    return (
        <div className="flex flex-col gap-1 bg-stone-800 px-4 pb-4 pt-1 rounded-lg max-w-3xl mb-4">
            {showEditQuote ? 
                <div className="flex flex-col gap-4">
                    <Form method="post"
                        className="flex flex-col gap-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 font-light mt-2"
                    >
                        <div className="flex flex-col">
                            <button type="submit" name="_method" value="delete" className="flex justify-end relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold tracking-wider uppercase">
                                        Quote
                                    </label>
                                    <textarea
                                        name="quoteBody"
                                        rows={2}
                                        className="w-full mb-0 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-sm" 
                                        defaultValue={quote.quote.body}
                                    />
                                    {actionData?.errors.body && (
                                        <p className="text-red-400 text-sm">{actionData.errors.body}</p>
                                    )}
                                </div>
                            </div>
                        </div>           
                        <div className="flex flex-col">
                            <button type="submit" name="_method" value="update" className="px-6 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded">
                                Update
                            </button> 
                        </div>
                    </Form>
                    <div onClick={() => setShowEditQuote(false)} 
                        className="border-2 border-stone-600 py-2 px-3 mt-2 rounded cursor-pointer hover:bg-stone-600">
                        <p className="text-center">Show Quote Details</p>
                    </div>
                </div> 
                : 
                <div>
                    <div className="flex flex-col py-3 border-b border-stone-700 w-full">
                        <p className="text-sm font-semibold tracking-wider uppercase">Quote ID</p>
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