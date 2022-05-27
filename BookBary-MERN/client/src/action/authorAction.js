export const GET_AUTHOR = () => async (dispatch) => {
    try{
        const getAuthor = await fetch(`http://localhost:5000/author`);
        const json = await getAuthor.json();
        const { author } = json;

        dispatch({ type:"GET_AUTHOR" , payload:author });
    } catch(err) {
        console.log(err);
    }
}

export const POST_AUTHOR = (query , navigate) => (dispatch) => {
    try {
        fetch(`http://localhost:5000/author` , {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(query)
        })
            .then(res=>res.json())
            .then(data => {
                dispatch({ type:"POST_AUTHOR" , payload:data.author });
                navigate("/author");
            });
    } catch(err) {
        console.log(err);
    }
}

export const DELETE_AUTHOR = (id) => (dispatch) => {
    try {
        fetch(`http://localhost:5000/author/${id}`, {
            method:"DELETE",
            headers:{
                "Content-Type":'application/json'
            }
        })
            .then(res => res.json())
            .then(data => dispatch({ type:"DELETE_AUTHOR" , payload:data.author }));
    } catch(err) {
        console.log(err);
    }
}

export const UPDATE_AUTHOR = (query) => (dispatch) => {
    try {
        fetch(`http://localhost:5000/author` , {
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(query)
        }).then(res=>res.json())
            .then(data => dispatch({ type:"UPDATE_AUTHOR" , payload:data.author }));
    } catch(err) {
        console.log(err);
    }
}