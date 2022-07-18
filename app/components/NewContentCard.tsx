import { Form } from "@remix-run/react";

export default function NewContentCard({data, onAuthorChange, authorName}: any) {

    return (
        <div className="col-span-1">
            <Form method="post"
                className="flex flex-col sm:w-96 gap-4 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
            >
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Title
                        </label>
                        <input type="text" name="title" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Author
                        </label>
                        <select name="authorId" className="bg-stone-700 rounded-sm p-1" onChange={onAuthorChange}>
                            {data.authors.map((author: any) => (
                                <option key={author.id}  value={author.id}>{author.name}</option>
                        ))}
                        </select>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Image URL
                        </label>
                        <input type="text" name="imgUrl" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                    </div>
                    <div>
                        <input type="hidden" name="authorName" value={authorName}/>
                    </div>
                </div>           
                <div className="flex flex-col">
                    <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600">Add New Content</button>
                </div>
            </Form>
        </div>
    )
}