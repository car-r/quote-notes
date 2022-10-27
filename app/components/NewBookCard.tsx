import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import ActionDataError from "./ActionDataError";
import ActionDataInput from "./ActionDataInput";
import PrimaryActionBtn from "./Buttons/PrimaryActionBtn";
import FormInput from "./FormInput";

export default function NewBookCard({data, onAuthorChange,  actionData}: any) {
    let transition = useTransition()
    let isAdding = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "create"

    // let formRef = useRef()
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!isAdding) {
            formRef.current?.reset();
        } 
    },[isAdding])

    console.log(actionData)
    return (
        <div className="col-span-1">
            <Form method="post"
                ref={formRef}
                className="flex flex-col sm:w-96 gap-6 border-2 border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
            >
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Title
                        </label>
                        {actionData?.errors.title ? (
                            <div className="flex flex-col">
                                <ActionDataInput type="text" name="title" defaultValue={""}/>
                                <ActionDataError children={actionData.errors.title} />
                            </div>
                        ) : 
                            <FormInput type="text" name="title" defaultValue={""}/>
                        }
                        {/* <input type="text" name="title" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                        {actionData?.errors.title && (
                            <ActionDataError children={actionData.errors.title} />
                        )} */}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Author
                        </label>
                        <select name="authorId" className="bg-stone-700 border border-stone-700 rounded-sm p-1" onChange={onAuthorChange}>
                            {data.authors.map((author: any) => (
                                <option key={author.id}  value={author.id}>{author.name}</option>
                        ))}
                        </select>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Book Image URL
                        </label>
                        {actionData?.errors.imgUrl ? (
                            <div className="flex flex-col">
                                <ActionDataInput type="text" name="imgUrl" defaultValue={""}/>
                                <ActionDataError children={actionData.errors.imgUrl} />
                            </div>
                        ) : 
                            <FormInput type="text" name="imgUrl" defaultValue={""}/>
                        }
                        {/* <input type="text" name="imgUrl" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                        {actionData?.errors.imgUrl && (
                            <ActionDataError children={actionData.errors.imgUrl} />
                        )} */}
                    </div>
                </div>           
                <div className="flex flex-col">
                    <button 
                        type="submit" name="_method" value="create" disabled={isAdding}>
                        <PrimaryActionBtn children={isAdding ? "Adding..." : "Add Book"}/>
                    </button>
                </div>
            </Form>
        </div>
    )
}