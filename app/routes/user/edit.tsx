
import ActionDataInput from "~/components/ActionDataInput";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useTransition } from "@remix-run/react";

import { getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import ActionDataError from "~/components/ActionDataError";
import FormInput from "~/components/FormInput";
import { prisma } from "~/db.server"
import { useEffect, useRef } from "react";
import PrimaryActionBtn from "~/components/Buttons/PrimaryActionBtn";
import { validateEmail } from "~/utils";

export const loader: LoaderFunction = async ({request}) => {
    const userId = await requireUserId(request);
    const user = await getUserById(userId)
    return {user}
}

// type ActionData = {
//     errors?: {
//       email?: string;
//     };
// };

export const action = async ({ request, params }: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const email = form.get('email')
    // const date: any = new Date
    // const updatedAt = date.toISOString()
    console.log(Object.fromEntries(form))


    // Action to update quote
    if(form.get('_method') === 'update') {

        const errors = {
            email: ''
        }
    
        // validation check to make sure body isn't less than 4 characters
        function checkEmail(body: any) {
            if(!email || email.length < 4) {
                return errors.email = `Email too short`
            }
        }
    
        checkEmail(email)


        // const isValidEmail = new RegExp('[\w-]+@([\w-]+\.)+[\w-]+')

        // const validateEmail = (value: string) => {
        //     if (!isValidEmail.test(value)) {
        //         return errors.email = `Not a valid email`
        //     }
        
        // }

        // validateEmail(email)

        if (!validateEmail(email)) {
            return json(
              { errors: { email: "Email is invalid" } },
              { status: 400 }
            );
        }
    
        if (errors.email) {
            const values = Object.fromEntries(form)
            return { errors, values }
        }

        const fields = {email}
        await prisma.user.update({where: {id: userId}, data: fields})
        return redirect(`/user`)
    }
}

export default function EditUser() {
    const user = useLoaderData()
    const actionData = useActionData()
    const formRef = useRef<HTMLFormElement>(null)

    let transition = useTransition()

    let isUpdating = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "update"

    useEffect(() => {
        if (!isUpdating) {
            formRef.current?.reset();
        }
    }, [isUpdating])

    return (
        <div className="flex flex-col gap-1 bg-stone-800 p-4 rounded-lg max-w-2xl">
            <Form method="post"
                ref={formRef} 
                className="flex flex-col w-full gap-1">
                <Link to={`/user`} className="hover:text-white flex w-full justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Link>
                <label className="text-sm font-semibold tracking-wider uppercase">
                    email
                </label>
                {actionData?.errors.email ? (
                    <div className="flex flex-col">
                        <ActionDataInput type="text" name="email" defaultValue={user.user.email} />
                        <ActionDataError children={actionData.errors.email}/>
                    </div>
                ) : 
                    <FormInput type="text" name="email" defaultValue={user.user.email}/>
                }
                <button type="submit" name="_method" value="update" disabled={isUpdating} className="pt-6">
                    <PrimaryActionBtn children={isUpdating ? "Updating..." : "Update User"}/>                                
                </button> 
            </Form>
        </div>
    )
}