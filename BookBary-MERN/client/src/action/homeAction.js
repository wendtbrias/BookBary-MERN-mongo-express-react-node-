export const Get_Book_Home = () => async (dispatch) => {
    fetch(`http://localhost:5000`)
        .then(res=>res.json())
        .then(data => {
            console.log(data.book);
            dispatch({ type:"GET_BOOK" , payload:data.book})
        })
        .catch(err => console.log(err));
}