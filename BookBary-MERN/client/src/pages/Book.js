import { useSelector,useDispatch  } from 'react-redux';
import { useEffect,useState } from "react";
import { GET_BOOK_PAGE,SEARCH_BOOK } from "../action/bookAction";
import { BookCard } from "../components";
import { useNavigate,useSearchParams } from "react-router-dom"

const BookPage = () => {
    const navigate = useNavigate();
    const bookState = useSelector(state => state.book);
    const dispatch = useDispatch();
    const [bookForm ,setBookForm] = useState({
        title:"",
        publishDateBefore:"",
        publishDateAfter:""
    });

    useEffect(() => {
        dispatch(GET_BOOK_PAGE());
    },[dispatch ]);

    function searchBookHandler() {
        let baseUrl = `http://localhost:5000/book?title=${bookForm.title}&publishDateBefore=${bookForm.publishDateBefore}&publishDaeAfter=${bookForm.publishDateAfter}`;
        fetch(`${baseUrl}`)
            .then(res=>res.json())
            .then(data => {
                dispatch({ type:"SEARCH_BOOK" ,payload:data.book });
                navigate("/book");
            });

    }

     if(!bookState.book) {
         return (
             <div className="text-center text-3xl">
                 <h1 className="text-blue-400 font-bold">No data found</h1>
             </div>
         )
     }

    return (
        <div className="w-full py-12">
            <h2 className="text-2xl text-blue-400 font-bold">Search Book</h2>
            <div className="w-[65%] flex items-center flex-wrap justify-between mt-10">
                 <div className="w-[49%] mb-3">
                     <label className="text-blue-300 font-medium">Title</label>
                     <input onChange={(e) => setBookForm({...bookForm,title:e.target.value})} type="text" placeholder="title" className="w-full py-2 px-3 rounded-md mt-3"/>
                 </div>
                <div className="w-[49%] mb-3">
                    <label className="text-blue-300 font-medium">PublishDateBefore</label>
                    <input onChange={(e) => setBookForm({...bookForm,publishDateBefore:e.target.value})} type="date" placeholder="pagecount" className="w-full py-2 px-3 rounded-md mt-3"/>
                </div>
                <div className="w-[49%] mb-3">
                    <label className="text-blue-300 font-medium">PublishDateAfter</label>
                    <input onChange={(e) => setBookForm({...bookForm,publishDateAfter:e.target.value})} type="date" placeholder="publishdate" className="w-full py-2 px-3 rounded-md mt-3"/>
                </div>
              <div className="buttons w-full mt-5 text-right">
                  <a href="/" className="py-2 px-3 rounded-md bg-orange-500 text-white font-semibold">Clear</a>
                  <button onClick={searchBookHandler} className="py-2 px-3 rounded-md bg-blue-500 ml-3 text-white font-semibold text-sm">Search</button>

              </div>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-10">
                {bookState?.book?.map((book , id) => <BookCard key={id}  book={book}/>)}
            </div>
        </div>
    )
}

export default BookPage;