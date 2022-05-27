import { POST_AUTHOR,DELETE_AUTHOR } from "../action/authorAction";
import { useDispatch ,useSelector } from "react-redux";
import { useState } from 'react';
import {  useNavigate } from "react-router-dom";

const AddAuthor = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const author = useSelector(state => state.author);
    const [authorForm,setAuthorForm] = useState({ name:"" , penName:""});

    function addAuthorHandler() {
        if(authorForm.name == "" && authorForm.penName == "") {
            alert('please complete form');
        }

        dispatch(POST_AUTHOR(authorForm ,navigate));
    }


    return (
        <div className="w-full py-12">
            <h2 className="text-2xl font-bold text-blue-300">Add Author</h2>
            <div className="w-[65%] flex items-center flex-wrap justify-between mt-7">
                <div className="w-[49%] mb-3">
                    <label className="text-blue-300 font-normal text-md">Name</label>
                    <input onChange={(e) => setAuthorForm({...authorForm , name:e.target.value})} type='text' className="w-full mt-3
                     py-2 px-3 rounded-md bg-white"/>
                </div>
                <div className="w-[49%] mb-3">
                    <label className="text-blue-300 font-normal text-md">PenName</label>
                    <input onChange={(e) => setAuthorForm({...authorForm , penName:e.target.value})} type='text' className="w-full mt-3 py-2 px-3 rounded-md bg-white"/>
                </div>
                <div className="buttons w-full mt-5 text-right">
                    <a href="/" className="py-2 px-3 rounded-md bg-orange-500 text-white font-semibold">Clear</a>
                    <button onClick={addAuthorHandler} className="py-2 px-3 rounded-md bg-blue-500 ml-3 text-white font-semibold text-sm">Submit</button>

                </div>
            </div>
        </div>
    )
}

export default AddAuthor;