import { Link } from "@remix-run/react";
import TopBackBtn from "./TopBackBtn";

export default function AuthorBackBtn({data, edit, setEdit}: any) {
    console.log('author quote btn -->', data)
    return (
        <Link to={`/authors`} onClick={() => setEdit(!edit)}>
            <TopBackBtn children={``}/>
        </Link>
    )
}