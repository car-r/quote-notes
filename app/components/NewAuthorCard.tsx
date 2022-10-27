import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import ActionDataError from "./ActionDataError";
import ActionDataInput from "./ActionDataInput";
import PrimaryActionBtn from "./Buttons/PrimaryActionBtn";
import FormInput from "./FormInput";

export default function NewAuthorCard({actionData}: any) {
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
        <div>
            <Form method="post"
                ref={formRef}
                className="flex flex-col sm:w-96 gap-6 border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light"
            >
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Author Name
                        </label>
                        {actionData?.errors.name ? (
                            <div className="flex flex-col">
                                <ActionDataInput type="text" name="name" defaultValue={""}/>
                                <ActionDataError children={actionData.errors.name} />
                            </div>
                        ) : 
                            <FormInput type="text" name="name" defaultValue={""}/>
                        }
                        {/* <input type="text" name="name" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                        {actionData?.errors.name && (
                            <ActionDataError children={actionData.errors.name} />
                        )} */}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Image URL
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
                    {/* <button 
                        type="submit" name="_method" value="create" disabled={isAdding} 
                        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
                    >
                        {isAdding ? "Adding..." : "Add Author"}
                    </button> */}
                    <button 
                        type="submit" name="_method" value="create" disabled={isAdding}>
                        <PrimaryActionBtn children={isAdding ? "Adding..." : "Add Author"}/>
                    </button>
                </div>
            </Form>
        </div>
    )
}