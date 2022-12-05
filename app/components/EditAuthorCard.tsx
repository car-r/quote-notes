import { Form, Link, useTransition } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import ActionDataError from "./ActionDataError";
import ActionDataInput from "./ActionDataInput";
import FormInput from "./FormInput";
import UpdateBtn from "./Buttons/UpdateBtn";
// import { useEdit, useSetEdit } from "~/routes/authors/$authorId";


// type EditAuthor = {
//     data: any,
//     actionData: any
//     setEdit: React.Dispatch<React.SetStateAction<boolean>>,
//     edit: React.Dispatch<React.SetStateAction<boolean>>
// }

// type Props = {
//     edit: boolean;
//     setEdit: (edit: boolean) => void
// }
type ActionData = {
    errors?: {
      name?: string | undefined;
      imgUrl?: string | undefined;
    } | undefined;
};

type Data = {
    data: {
        id: string
        createdAt: string
        imgUrl: string
        name: string
        userId: string
    }
}

type EditAuthor = {
    data: Data,
    actionData: ActionData

}

// export default function EditAuthorCard({data, actionData, setEdit, edit}: EditAuthor)

export default function EditAuthorCard({data, actionData}: EditAuthor) {
    const [willDelete, setWillDelete] = useState(false)
    let transition = useTransition()

    let isDeleting = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "delete"
    
    let isUpdating = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "update"


    const formRef = useRef<HTMLFormElement>(null)

    // const [edit, setEdit]: any = useOutletContext()
    // const {setEdit} = useOutletContext<{ setEdit: SetEdit }>()
    // let { setEdit } = useSetEdit()
    // const { edit } = useEdit()


    // useEffect(() => {
    //     if (!isUpdating) {
    //         formRef.current?.reset();
    //     } else if (isUpdating) {
    //         setEdit(false)
    //     }
    // },[isUpdating, setEdit, edit])

    useEffect(() => {
        if (!isUpdating) {
            formRef.current?.reset();
        } 
    },[isUpdating])

    console.log('edit author card --> ', data)
    return (
        <div className="flex flex-col p-4 min-h-full justify-center border-2 border-stone-800 bg-stone-800 rounded-lg">
            <Form method="post"
                ref={formRef}
                className="flex flex-col gap-6 rounded-md text-stone-300/60 font-light"
            >
                <div className="flex flex-col gap-4">
                        <div className="flex w-full justify-between pb-2">
                            <Link to={`/authors/${data.data.id}`} className=" hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Link>

                            <div onClick={() => setWillDelete(!willDelete)} className=" hover:text-white hover:cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                        </div>
                    <div className="flex flex-col gap-1 md:gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Author Name
                        </label>
                        {actionData?.errors?.name ? (
                            <div className="flex flex-col">
                                <ActionDataInput type="text" name="name" defaultValue={data.data.name} />
                                <ActionDataError children={actionData.errors.name}/>
                            </div>
                        ) : 
                            <FormInput type="text" name="name" defaultValue={data.data.name}/>
                        }
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Author Image URL
                        </label>
                        {actionData?.errors?.imgUrl ? (
                            <div className="flex flex-col">
                                <ActionDataInput type="text" name="imgUrl" defaultValue={data.data.imgUrl}/>
                                <ActionDataError children={actionData.errors.imgUrl}/>
                            </div>
                        ) :
                            <FormInput type="text" name="imgUrl" defaultValue={data.data.imgUrl}/>
                        }
                    </div>
                </div>           
                <div className="flex flex-row">
                    {!willDelete ? 
                    <button 
                        type="submit" name="_method" value="update" disabled={isUpdating || isDeleting} >
                        <UpdateBtn children={isDeleting ? "Deleting..." : isUpdating ? "Updating..." : "Update Author"} />
                    </button> 
                    :
                    <button 
                        type="submit" name="_method" value="delete" disabled={isUpdating || isDeleting}
                        className="py-2 px-2 flex gap-2 text-sm items-center text-white rounded bg-red-400 border-2 border-red-400 hover:bg-red-600 hover:border-red-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        {isDeleting ? "Deleting..." : "Delete Author"}
                    </button> 
                    }
                </div>
            </Form>
        </div> 
    )
}