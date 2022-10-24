import { Link } from "@remix-run/react"
import TopBtn from "./TopBtn"

export default function EditAuthorBtn({data, edit, setEdit}: any) {
    console.log('edit author btn -->', data, edit)
    return (
        <Link to={`/authors/${data.author.id}/edit`} onClick={() => setEdit(!edit)}>
            <TopBtn children={`Edit Author`}/>
        </Link>
    )
}