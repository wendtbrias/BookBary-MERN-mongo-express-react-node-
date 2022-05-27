import moment from "moment";
import { useParams,useNavigate  } from 'react-router-dom';
import { useState,useEffect } from "react";
import { DELETE_BOOK_PAGE } from "../action/bookAction";
import { useDispatch } from "react-redux";

const BookDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bookDetail,setBookDetail ] = useState(null);

    async function get_book_detail() {
         const detailReq=  await fetch(`http://localhost:5000/book/${params.id}`);
         const json = await detailReq.json();
         setBookDetail(json.book);
         console.log(json);

    }

    function deleteHandler(id) {
      dispatch(DELETE_BOOK_PAGE(id, navigate));

    }

    useEffect(() => {
       get_book_detail();
    },[params.id,dispatch]);

    if(!bookDetail) {
        return (
            <div className="text-center py-10 ">
                <h1 className="text-3xl font-bold text-blue-400">Loading...</h1>
            </div>
        )
    }

    return (
        <div className="w-full mt-10">
            <div className="w-[68%] flex items-start">
               <div className="w-[35%]">
                   <img src={bookDetail.coverImage} alt={bookDetail.title} className={"w-full h-[320px] object-cover rounded-md"}/>
                   <div className="buttons flex items-center justify-between mt-5">
                       <a href={`/book/update/${bookDetail._id}`} className={"w-[49%] text-center bg-blue-400 text-white font-semibold py-2 rounded-md"}>Update</a>
                       <button onClick={() => deleteHandler(bookDetail._id)} className={"w-[49%] bg-red-400 text-white font-semibold py-2 rounded-md"}>Delete</button>

                   </div>
               </div>
                <div className="w-[58%] ml-10">
                    <h2 className="text-blue-400 font-semibold text-xl mb-3">Title : {bookDetail.title}</h2>
                    <h2 className="text-blue-400 font-semibold text-lg mb-3">Pagecount : {bookDetail.pageCount}</h2>
                    <h2 className="text-blue-400 font-semibold text-lg mb-3">Author : {bookDetail?.author?.name}</h2>
                    <h2 className="text-blue-400 font-semibold text-lg mb-3">Publish : {moment(bookDetail.publishDate).format("MMM DD,YYYY")}</h2>
                    <h2 className="text-blue-400 font-semibold text-lg mb-3">Description : {bookDetail.description}</h2>
                </div>
            </div>
        </div>
    )
}

export default BookDetail;