import { useSelector,useDispatch } from "react-redux";
import { GET_BOOK_PAGE,POST_BOOK_PAGE } from "../action/bookAction";
import FileBase64 from "react-file-base64";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const navigate = useNavigate();
    const [bookForm,setBookForm] = useState({
        title:"",
        pageCount:0,
        description:"",
        author:"",
        publishDate:"",
        coverImage:""
    })
    const { book , author } = useSelector(state => state.book);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_BOOK_PAGE());
    } ,[dispatch]);

    function setBookFormHandler( e) {
        setBookForm({...bookForm , [e.target.name]:e.target.value});
    }

    function addBookHandler() {
        if(bookForm.coverImage.length > 100000) {
            return alert('image is to large');
        }
        dispatch(POST_BOOK_PAGE(bookForm ,navigate));
    }

    if(!author && !book) {
        return (
            <div className="w-full py-12 text-center">
                <h1 className="text-3xl font-bold text-blue-400">No Data found</h1>
            </div>
        )
    }

    return (
        <div className="w-full py-10">
            <h2 className="text-2xl text-blue-400 font-bold">Add Book</h2>
            <div className="form w-[65%] flex items-center justify-between flex-wrap mt-7">
                <div className="w-[49%] mb-3 ">
                    <label className="text-blue-300 font-medium">Title</label>
                    <input onChange={setBookFormHandler} name="title" type="text" placeholder="title" className="w-full py-2 px-3 rounded-md mt-3"/>
                </div>
                <div className="w-[49%] mb-3">
                    <label className="text-blue-300 font-medium">PageCount</label>
                    <input onChange={setBookFormHandler} name="pageCount" type="number" placeholder="pagecount" className="w-full py-2 px-3 rounded-md mt-3"/>
                </div>
                <div className="w-[49%] mb-3">
                    <label className="text-blue-300 font-medium">Publishdate</label>
                    <input onChange={setBookFormHandler} name="publishDate" type="date" className="w-full py-2 px-3 rounded-md mt-3"/>
                </div>
                <div className="w-[49%] mb-3">
                    <label className="text-blue-300 font-medium">Author</label>
                    <select onChange={setBookFormHandler} name="author" className="w-full py-2 px-3 rounded-md mt-3">
                        {author.map((author , id) => <option value={author._id} key={id}>{author.name}</option>)}
                    </select>
                </div>
                <div className="w-[70%] mb-3">
                    <label className="text-blue-300 font-medium">Description</label>
                    <textarea onChange={setBookFormHandler} name="description" className="w-full py-2 px-3 rounded-md mt-3 h-[150px] bg-white"></textarea>
                </div>
                <div className="w-[20%]">
                    <label className="text-blue-300 font-medium">Coverimage</label>
                    <FileBase64 onDone={({ base64 }) => setBookForm({...bookForm ,coverImage:base64 })} name="coverImage" multiple={false} className="mt-4"/>
                </div>
                <div className="buttons w-full mt-7 text-right">
                    <a href="/book" className="py-2 px-4 rounded-md bg-orange-400 text-white font-semibold">Clear</a>
                    <button onClick={addBookHandler} className="py-2 px-4 rounded-md bg-blue-400 font-semibold text-white ml-3 text-sm">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddBook;