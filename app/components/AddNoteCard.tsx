import { Form } from "@remix-run/react";

export default function AddNoteCard({quote}: any) {
    return (
        <div>
            <Form className="flex flex-col" method="post" name="_method">
                <label>
                <textarea
                    name="body"
                    rows={4}
                    className="w-full mb-4 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-md"
                />
                </label>
                <input type="hidden" name="authorId" value={quote.quote.authorId}/>
                <input type="hidden" name="contentId" value={quote.quote.contentId}/>
                <button className="px-4 py-2 bg-blue-400 rounded text-white hover:bg-blue-600">Add Note</button>
            </Form>
        </div>
    )
}