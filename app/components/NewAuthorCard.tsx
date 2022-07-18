import { Form } from "@remix-run/react";

export default function NewAuthorCard({actionData}: any) {
    console.log(actionData)
    return (
        <div>
            <Form method="post"
                className="flex flex-col sm:w-96 gap-6 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
            >
                <div className="flex flex-col gap-6">
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
                            Image URL
                        </label>
                        <input type="text" name="imgUrl" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                        {actionData?.errors.imgUrl && (
                            <p className="text-red-400 text-sm">{actionData.errors.imgUrl}</p>
                        )}
                    </div>
                </div>           
                <div className="flex flex-col">
                    <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600">Create Author</button>
                </div>
            </Form>
        </div>
    )
}