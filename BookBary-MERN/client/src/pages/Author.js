import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  GET_AUTHOR,
  DELETE_AUTHOR,
  UPDATE_AUTHOR,
} from "../action/authorAction";
import { useNavigate } from "react-router-dom";

const AuthorPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const author = useSelector((state) => state.author);
  const buttonRef = useRef();

  const [Authordata, setAuthorData] = useState([]);
  const [authorForm, setAuthorForm] = useState({ name: "", penName: "" });

  useEffect(() => {
    dispatch(GET_AUTHOR());
    console.log("test");
  }, [dispatch]);

  function searchAuthorHandler() {
    if (buttonRef.current.innerHTML == "Update") {
      dispatch(UPDATE_AUTHOR(authorForm));
      buttonRef.current.innerHTML = "Search";
    } else {
      dispatch({ type:"SEARCH_AUTHOR" , payload:authorForm.name });
    }
  }

  function clearForm() {
    setAuthorForm({ name: "", penName: "" });
  }

  function deleteAuthor(id) {
    dispatch(DELETE_AUTHOR(id));
    navigate("/author");
  }

  function updateAuthorDisplay(author) {
    setAuthorForm(author);
    buttonRef.current.innerHTML = "Update";
  }

  function formHandler(e) {
    setAuthorForm({ ...authorForm, [e.target.name]: e.target.value });
  }

  return (
    <div className="w-full py-12">
      <h2 className="text-2xl font-bold text-blue-300">Author Page</h2>

      <div className="w-[65%] flex items-center flex-wrap justify-between mt-7">
        <div className="w-[49%] mb-3">
          <label className="text-blue-300 font-normal text-md">Name</label>
          <input
            onChange={formHandler}
            name="name"
            value={authorForm.name}
            type="text"
            className="w-full mt-3
                     py-2 px-3 rounded-md bg-white"
          />
        </div>
        <div className="w-[49%] mb-3">
          <label className="text-blue-300 font-normal text-md">PenName</label>
          <input
            onChange={formHandler}
            name="penName"
            value={authorForm.penName}
            type="text"
            className="w-full mt-3 py-2 px-3 rounded-md bg-white"
          />
        </div>
        <div className="buttons w-full mt-5 text-right">
          <a
            href="/"
            className="py-2 px-3 rounded-md bg-orange-500 text-white font-semibold"
          >
            Clear
          </a>
          <button
            onClick={searchAuthorHandler}
            ref={buttonRef}
            className="py-2 px-3 rounded-md bg-blue-500 ml-3 text-white font-semibold text-sm"
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-10">
        {author?.map((author, id) => {
          return (
            <div className="border border-white py-3 px-4 rounded-md" key={id}>
              <h2 className="text-md font-semibold text-blue-200">
                Name : {author.name}
              </h2>
              <h4 className="text-sm font-medium mt-1 text-blue-200">
                Penname : {author.penName}
              </h4>
              <div className="buttons mt-5">
                <button
                  onClick={() => updateAuthorDisplay(author)}
                  className="text-white text-sm font-bold py-2 px-3 rounded-md bg-blue-400"
                >
                  Update
                </button>
                <a
                  href={`/author/${author._id}`}
                  className="text-white text-sm mx-2 font-bold py-2 px-3 rounded-md bg-orange-400"
                >
                  View
                </a>
                <button
                  onClick={() => deleteAuthor(author._id)}
                  className="text-white text-sm font-bold py-2 px-3 rounded-md bg-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuthorPage;
