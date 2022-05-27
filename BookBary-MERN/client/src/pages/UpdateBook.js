import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { UPDATE_BOOK_PAGE } from "../action/bookAction";
import {useDispatch, useSelector} from "react-redux";
import FileBase64 from "react-file-base64";

const UpdateBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookState = useSelector(state => state.book);
  const [author , setAuthor] = useState([]);
  const [bookForm ,setBookForm] = useState({
    title:"",
    pageCount:"",
    author:"",
    description:"",
    coverImage:"",
    publishDate:""
  });
  const params = useParams();


  useEffect(() => {
    fetch(`http://localhost:5000/book`)
        .then(res=>res.json())
        .then(data => {
            const find = data.book.find(book => book._id == params.id);
            setBookForm(find);
            setAuthor(data.author);
        })

  } ,[params.id]);

  function setBookFormHandler(e) {
    setBookForm({...bookForm , [e.target.name]:e.target.value});
  }

  function updateBookHandler() {
    fetch(`http://localhost:5000/book` , {
      method:"PUT",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(bookForm)
    }).then(res=>res.json())
        .then(data => {
          dispatch({ type:"UPDATE_BOOK" , payload:data.book });
          navigate(`/book/${bookForm._id}`);
        })
  }

  if(!bookState) {
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
            <input value={bookForm.title} onChange={setBookFormHandler} name="title" type="text" placeholder="title" className="w-full py-2 px-3 rounded-md mt-3"/>
          </div>
          <div className="w-[49%] mb-3">
            <label className="text-blue-300 font-medium">PageCount</label>
            <input value={bookForm.pageCount} onChange={setBookFormHandler} name="pageCount" type="number" placeholder="pagecount" className="w-full py-2 px-3 rounded-md mt-3"/>
          </div>
          <div className="w-[49%] mb-3">
            <label className="text-blue-300 font-medium">Publishdate</label>
            <input value={new Date(bookForm.publishDate)} onChange={setBookFormHandler} name="publishDate" type="date" className="w-full py-2 px-3 rounded-md mt-3"/>
          </div>
          <div className="w-[49%] mb-3">
            <label className="text-blue-300 font-medium">Author</label>
            <select  onChange={setBookFormHandler} name="author" className="w-full py-2 px-3 rounded-md mt-3">
              {author.map((author , id) => <option value={author._id} key={id}>{author.name}</option>)}
            </select>
          </div>
          <div className="w-[70%] mb-3">
            <label className="text-blue-300 font-medium">Description</label>
            <textarea onChange={setBookFormHandler} defaultValue={bookForm.description} name="description" className="w-full py-2 px-3 rounded-md mt-3 h-[150px] bg-white"></textarea>
          </div>
          <div className="w-[20%]">
            <label className="text-blue-300 font-medium">Coverimage</label>
            <img src={bookForm.coverImage} className="w-full h-[80px] block mt-4 mb-4"/>
            <FileBase64 onDone={({ base64 }) => setBookForm({...bookForm ,coverImage:base64 })} name="coverImage" multiple={false} className="mt-4"/>
          </div>
          <div className="buttons w-full mt-7 text-right">
            <a href="/book" className="py-2 px-4 rounded-md bg-orange-400 text-white font-semibold">Clear</a>
            <button onClick={updateBookHandler} className="py-2 px-4 rounded-md bg-blue-400 font-semibold text-white ml-3 text-sm">Update</button>
          </div>
        </div>
      </div>
  )
}

export default UpdateBook;