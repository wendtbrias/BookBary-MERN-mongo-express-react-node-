import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { BookCard } from "../components";

const AuthorDetail = () => {
    const params = useParams();
    const [Data,setData] = useState({});

    useEffect(()  => {
        fetch(`http://localhost:5000/author/${params.id}`)
            .then(res=>res.json())
            .then(data => setData(data));
    },[params.id]);

    if(!Data.author && !Data.book) {
        return "";
    }

    return (
        <div className="w-full py-12">
            <h2 className="text-2xl text-blue-300 font-bold">{Data.author.name}&raquo;</h2>
            {Data.book.length < 1 ? (
                <h2 className='text-blue-300 mt-10 font-semibold'>No Book from this author</h2>
            ) : (
                <div className="w-full grid grid-cols-5 gap-4 mt-10">
                    {Data.book.map((book , id) => <BookCard key={id} book={book}/>)}
                </div>
            )}
        </div>
    )
}

export default AuthorDetail;