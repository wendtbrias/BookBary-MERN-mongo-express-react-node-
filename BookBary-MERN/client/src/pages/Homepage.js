import { useSelector , useDispatch } from "react-redux";
import { useEffect,useRef } from "react";
import { Get_Book_Home } from "../action/homeAction";
import {BookCard} from "../components";

const Homepage = () => {
    const bookHome = useSelector(state => state.home);
    const dispatch = useDispatch();

    const findRef = useRef();

    useEffect(() => {
        dispatch(Get_Book_Home());
    }, [dispatch]);

    function searchBookHandler() {
       dispatch({ type:"FIND_BOOK" , payload:findRef.current.value });
    }

    if(!bookHome) {
        return (
            <div className="text-center py-12">
                <h2 className="text-blue-500 text-3xl font-bold">No Book Here</h2>
            </div>
        )
    }

    return (
        <div className={"w-full py-10"}>
            <h2 className={"text-2xl font-bold text-blue-400 uppercase"}>Recently Add</h2>
            <div className="w-[45%] mt-10">
                <input onChange={searchBookHandler} ref={findRef} type="search" placeholder="find the book" className="w-full py-2 px-3 rounded-md"/>
            </div>
            <div className="w-full grid grid-cols-5 gap-4 mt-14">
                {bookHome.length > 0 && bookHome.map((book , key) => {
                    return <BookCard key={key} book={book}/>
                })}
            </div>
        </div>
    )
}

export default Homepage;