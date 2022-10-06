import { Form } from "@remix-run/react";

export default function FirstQuoteForm({actionData}: any) {
    return (
        <div>
            <Form method="post"
                className="flex flex-col gap-6 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light md:w-72"
            >
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold tracking-wider uppercase">
                        Quote
                    </label>
                    <textarea
                    name="body"
                    rows={3}
                    className="min-w-xl mb-1 text-stone-800 rounded-md border-2 border-stone-800 py-2 px-3 text-lg"
                    />
                    {actionData?.errors.body && (
                        <p className="text-red-400 text-sm">{actionData.errors.body}</p>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold tracking-wider uppercase">
                        Author Name
                    </label>
                    <input type="text" name="name" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                    {actionData?.errors.name && (
                        <p className="text-red-400 text-sm">{actionData.errors.name}</p>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold tracking-wider uppercase">
                        Content Title
                    </label>
                    <input type="text" name="title" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                    {actionData?.errors.title && (
                        <p className="text-red-400 text-sm">{actionData.errors.title}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600">Add Quote</button>
                </div>
            </Form>
        </div>
    )
}