import { Form } from "@remix-run/react";
import moment from "moment";

export default function QuoteNoteDeleteCard({quoteNote}: any) {
    return (
        <div className="flex flex-col gap-1 bg-stone-800 p-4 rounded-lg max-w-2xl">
            <div className="flex flex-col py-3 border-b border-stone-700 w-full">
                <p className="text-sm font-semibold tracking-wider uppercase">Note ID</p>
                <p className="truncate ..."><span className="font-thin text-lg">{quoteNote.data.id}</span></p>
            </div>
            <div className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0">
                <p className="text-sm font-semibold tracking-wider uppercase">Note created</p>
                <p><span className="font-thin text-lg">{moment(quoteNote.data.createdAt).format('MMM DD, YYYY')}</span></p>
            </div>
            <div className="mt-6 flex flex-col">
                <Form method="post">
                    <button
                        name="_method"
                        value="delete"
                        className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600 flex w-full justify-center"
                    >
                        Delete Note
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </Form>
            </div>
        </div>
    )
}