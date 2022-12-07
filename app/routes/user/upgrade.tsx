import { Form, Link, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { useRef, useEffect } from "react";
import ActionDataError from "~/components/ActionDataError";
import ActionDataInput from "~/components/ActionDataInput";
import PrimaryActionBtn from "~/components/Buttons/PrimaryActionBtn";
import FormInput from "~/components/FormInput";
import { getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({request}) => {
    const userId = await requireUserId(request);
    const user = await getUserById(userId)
    return {user}
}

export const action: ActionFunction = async ({request}) => {
    const id = await requireUserId(request);
    const form = await request.formData()
    const email = form.get('email') as string
    // const currentPricingPlan = form.get('pricingPlan') as string
    const pricingPlan = form.get('newPricingPlan') as string
    const upgradeCode = form.get('upgradeCode') as string
    console.log(upgradeCode)
    const errors = {
        pricingPlan: ''
    }

    function validatePricingPlan() {
        if (upgradeCode !== 'accessgranted' && pricingPlan !== 'free') {
            return errors.pricingPlan = `Enter valid code`
        } 
    }

    validatePricingPlan()

    if (errors.pricingPlan) {
        const values = Object.fromEntries(form)
        return { errors, values }
    }

    const fields = {id, email, pricingPlan}
    await prisma.user.update({where: {id: id}, data: fields})
    return redirect(`/user`)
}

export default function Upgrade() {
    const user = useLoaderData()
    const actionData = useActionData()
    const formRef = useRef<HTMLFormElement>(null)

    let transition = useTransition()

    let isUpdating = 
        transition.state === "submitting" &&
        transition.submission.formData.get("_method") === "upgrade"

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
                <div className="flex flex-col pb-3 border-b border-stone-700 w-full">
                    <p className="text-sm font-semibold tracking-wider uppercase">Current Plan</p>
                    <p className=""><span className="font-thin text-lg uppercase">{user.user.pricingPlan}</span></p>
                </div>
                <div className="flex flex-col pt-1 pb-5 border-b border-stone-700 w-full">
                    <label className="text-sm font-semibold tracking-wider uppercase py-2">
                        New Pricing Plan
                    </label>
                    <select name="newPricingPlan" id="" className="bg-stone-700 px-1 py-2 rounded">
                        <option value="free">FREE</option>
                        <option value="pro">PRO | $5/month</option>
                        <option value="elite">ELITE | $9/month</option>
                    </select>
                </div>
                <label className="text-sm font-semibold tracking-wider uppercase pt-3 pb-1">
                    Upgrade Code
                </label>
                <input hidden type="text" name="pricingPlan" defaultValue={user.user.pricingPlan}/>
                <input hidden type="text" name="email" defaultValue={user.user.email}/>
                {actionData?.errors.pricingPlan ? (
                    <div className="flex flex-col">
                        <ActionDataInput type="text" name="upgradeCode" defaultValue={''} />
                        <ActionDataError children={actionData.errors.pricingPlan}/>
                    </div>
                ) : 
                <FormInput type="text" name="upgradeCode" defaultValue={''} placeholder="enter upgrade code"/>
                }
                <button type="submit" name="_method" value="upgrade" disabled={isUpdating} className="pt-6">
                    <PrimaryActionBtn children={isUpdating ? "Upgrading..." : "Upgrade Account"}/>                                
                </button> 
            </Form>
        </div>
    )
}