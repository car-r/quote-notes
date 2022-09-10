import { Form } from "@remix-run/react";
import { useState } from "react";

export default function QuoteTags({quote, actionData}: any) {
    const [settings, setSettings] = useState(false)

    // function to loop through settings array and remove a duplicate?

    console.log('quoteTags component -> ', quote.quote.tag)

    return (
        <div className="flex flex-col gap-1 bg-stone-800 px-4 pb-4 pt-1 rounded-lg max-w-3xl mb-4">
            {!settings ? 
            <div className="flex flex-col gap-4">
                <div className="flex flex-col py-3 border-b border-stone-700 w-full">
                    <div className="flex justify-between">
                        <p className="text-sm font-semibold tracking-wider uppercase">Tags</p>
                        <button onClick={() => setSettings(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 font-bold rounded-lg hover:text-stone-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                    {/* <p className="text-sm font-semibold tracking-wider uppercase">Tags</p> */}
                    <div className="flex gap-1 overflow-auto pt-2 pb-6 scrollbar-thin scrollbar-track-stone-700 scrollbar-thumb-stone-600">
                    {quote.quote.tag?.map((tag: any) => (
                        <Form key={tag.id} method="post" name="_method">
                            <div className="items-center flex text-xs text-stone-300 font-thin truncate px-2 py-1 rounded-xl bg-stone-700 gap-1">
                                <p  className="truncate ... ">
                                    <span>
                                        {tag.body}
                                    </span>
                                </p>
                                <input type="hidden" name="tagId" value={tag.id}/>
                                <button name="_method" value="deleteTag" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="p-1 w-5 h-5 font-bold text-stone-800 rounded-lg hover:text-stone-300 hover:bg-stone-600" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </Form>
                        
                    ))}
                    </div>
                </div>
                <Form className="flex flex-col " method="post" name="_method">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                    
                        </label>
                        <input type="text" name="tagBody" className="px-2 py-1 border border-stone-800 bg-stone-700 rounded" placeholder="enter a tag"/>
                        {actionData?.errors.tagBody && (
                            <p className="text-red-400 text-sm mb-2">{actionData.errors.tagBody}</p>
                        )}
                    <button name="_method" value="tag"
                        className="px-4 py-2 mt-4 border-2 border-blue-400 hover:bg-blue-400 text-white rounded text-center cursor-pointer">
                        Add Tag
                    </button>
                </Form>
            </div>
            : 
            <div className="flex flex-col gap-4">
                <div className="flex flex-col py-3 w-full">
                    <div className="flex justify-between mb-2">
                        <p className="text-sm font-semibold tracking-wider uppercase">Quote</p>
                        <button onClick={() => setSettings(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 font-bold rounded-lg hover:text-stone-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                
                        <Form method="post"
                            className="flex flex-col gap-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 font-light mt-2"
                        >
                            <div className="flex flex-col">

                                
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
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
                            <div className="border-2 border-red-700 py-2 px-3 mt-2 rounded cursor-pointer hover:border-red-500 hover:text-stone-100">
                                <button type="submit" name="_method" value="delete" className="flex justify-end relative  mx-auto">
                                    <span className="">Delete</span>
                                </button>
                            </div>
                        </Form>
                    </div> 
                </div>
            }
        </div>
    )
}