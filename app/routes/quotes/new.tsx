import { redirect } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { prisma } from "~/db.server"

export const action = async ({request}: any) => {
    const form = await request.formData()
}

export default function NewQuote() {
    return (
        <div>
            <h2>New quote</h2>
            <Form method="post">
                <div>
                    <label>
                        Quote:
                    </label>
                    <input type="text" name="body" className="px-2 border border-neutral-200 rounded"/>
                </div>
                <div>
                    <button type="submit" className="px-4 py-2 bg-blue-400">Add Quote</button>
                </div>
            </Form>
        </div>
    )
}