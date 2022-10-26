import { useActionData, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import BookErrorBackBtn from "~/components/Buttons/BookErrorBackBtn";
import NewBookCard from "~/components/NewBookCard";
import PageTitle from "~/components/PageTitle";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const authors = await prisma.author.findMany({where: {userId: userId}})
    
    return {authors}
}

export const action = async ({request}: any) => {
    const userId = await requireUserId(request);
    const form = await request.formData()
    const authorId = form.get('authorId')
    const title = form.get('title')
    const imgUrl = form.get('imgUrl')

    const errors = {
        title: '',
        imgUrl: ''
    }

    function checkTitleName(title: any) {
        if(!title || title.length < 3) {
            return errors.title = `Title too short`
        }
    }

    checkTitleName(title)

    const isValidImageUrl = new RegExp('(jpe?g|png|gif|bmp)$')

    const validateImageUrl = (value: string) => {
        if (!isValidImageUrl.test(value)) {
            return errors.imgUrl = `Not a valid Image URL`
        }
    }

    validateImageUrl(imgUrl)

    if (errors.title || errors.imgUrl) {
        const values = Object.fromEntries(form)
        return { errors, values }
    }

    const fields = { authorId, title, imgUrl, userId }

    const book = await prisma.book.create({ data: fields})
    return redirect(`/books/${book.id}`)
}

export default function NewContent(): JSX.Element {
    const data = useLoaderData()
    const actionData = useActionData()

    // console.log('new book route --> ', data)
    
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`New Book`} btn={<BookErrorBackBtn />}/>
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <NewBookCard data={data} actionData={actionData}/>
            </div>
        </div>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`New Book`} btn={<BookErrorBackBtn />}/>
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="flex flex-col col-span-2 ">
                    <div className='flex flex-col justify-center py-10 border border-red-500 text-red-500 rounded-lg text-center w-full'>
                        <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
