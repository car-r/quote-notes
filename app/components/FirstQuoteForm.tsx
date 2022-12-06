import { Form } from "@remix-run/react";
import ActionDataError from "./ActionDataError";

export type ActionData = {
    errors: {
        body: string
        name: string
        title: string
        pricingPlan: string
    }
}

export type Data = {
    data: any
}

export type FirstQuoteFormType = {
    actionData: ActionData
    data: Data
}

export default function FirstQuoteForm({actionData, data}: any) {
    // console.log('first quote form', data)
    return (
        <div>
            <Form method="post"
                className="border border-stone-800 bg-stone-800 p-4 rounded-md text-stone-300/60 font-light md:w-72"
            >
                <div className="flex flex-col gap-6">
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
                            <ActionDataError children={actionData.errors.body} />
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Author Name
                        </label>
                        <input type="text" name="name" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                        {actionData?.errors.name && (
                            <ActionDataError children={actionData.errors.name} />
                        )}
                    </div>
                    <div className="flex flex-col gap-1 pb-2">
                        <label className="text-sm font-semibold tracking-wider uppercase">
                            Book Title
                        </label>
                        <input type="text" name="title" className="px-2 border border-stone-800 bg-stone-700 rounded"/>
                        {actionData?.errors.title && (
                            <ActionDataError children={actionData.errors.title} />
                        )}
                    </div>
                    <input hidden type="text" name="pricingPlan" defaultValue={data.user.pricingPlan}/>
                    <input hidden type="number" name="quoteCount" defaultValue={data.user._count.quotes}/>
                    <input hidden type="number" name="bookCount" defaultValue={data.user._count.book}/>
                </div>
                {actionData?.errors.pricingPlan && (
                    <ActionDataError children={actionData.errors.pricingPlan}/>
                )}
                <div className="flex flex-col pt-4">
                    <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600">
                        Add Quote
                    </button>
                </div>
            </Form>
        </div>
    )
}