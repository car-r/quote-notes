import { Form } from "@remix-run/react";

export default function AddNoteCard({quote, actionData}: any) {
    // console.log(actionData)
    return (
        <div>
            <Form className="flex flex-col " method="post" name="_method">
                <label>
                <textarea
                    name="body"
                    rows={4}
                    className="w-full text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-md"
                />
                </label>
                {actionData?.errors.noteBody && (
                    <p className="text-red-400 text-sm mb-2">{actionData.errors.noteBody}</p>
                )}
                <input type="hidden" name="authorId" value={quote.quote.authorId}/>
                <input type="hidden" name="contentId" value={quote.quote.contentId}/>
                <button name="_method" value="note"
                    className="px-4 py-2 mt-2 bg-blue-400 rounded text-white hover:bg-blue-600">
                    Add Note
                </button>
            </Form>
        </div>
    )
}