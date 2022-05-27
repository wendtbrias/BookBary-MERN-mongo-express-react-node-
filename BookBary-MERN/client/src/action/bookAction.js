export const GET_BOOK_PAGE  = () => async (dispatch) => {
     try {
         fetch(`http://localhost:5000/book`)
             .then(res=>res.json())
             .then(data => {
                 dispatch({ type:"GET_BOOK_INIT" , payload:{ book:data.book , author:data.author }});
             });
     } catch(err) {
         console.log(err);
     }
}

export const POST_BOOK_PAGE = (query , navigate) =>  (dispatch) => {
    try {
      fetch(`http://localhost:5000/book` , {
          method:"POST",
          headers:{
              "Content-Type":'application/json'
          },
          body:JSON.stringify(query)
      })
          .then(res => res.json())
          .then(data => {
              console.log(data.book);
              dispatch({ type:"POST_BOOK" , payload:data.book });
              navigate("/book");
          });
    } catch(err) {
        console.log(err);
    }
}

export const DELETE_BOOK_PAGE = (id,navigate) =>  (dispatch) => {
    try {
        fetch(`http://localhost:5000/book/${id}` , {
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                dispatch({ type:"DELETE_BOOK" , payload:data.book });
                navigate("/book");
            });
    }
    catch(err) {
        console.log(err);
    }
}

export const UPDATE_BOOK_PAGE = (query) => (dispatch) => {
    try {
        fetch(`http://localhost:5000/book` , {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(query)
        }).then(res=>res.json())
            .then(data => {
                dispatch({ type:"UPDATE_BOOK" ,payload:data.book });
            });
    } catch(err) {
        console.log(err);
    }
}

export const SEARCH_BOOK = (url) => (dispatch) => {
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => dispatch({ type:"SEARCH_BOOK" ,payload:data.book }));
    } catch(err) {
        console.log(err);
    }
}