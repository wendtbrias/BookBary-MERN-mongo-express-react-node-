const init = []
export default function authorReducer(state = JSON.parse(localStorage.getItem('authorData')) || init, {type,payload}) {
    switch(type) {
        case "GET_AUTHOR":
            state = payload;
            localStorage.setItem("authorData" ,JSON.stringify(state));
            return state;
            break;

        case "POST_AUTHOR":
            state = [...state ,payload];
            localStorage.setItem('authorData' , JSON.stringify(state));
            return state;
            break;

        case "DELETE_AUTHOR":
            const filterResult = state.filter(author => author._id !== payload ? author : "");
            localStorage.setItem("authorData" ,JSON.stringify(filterResult));
            return filterResult;
            break;

        case "UPDATE_AUTHOR":
            const mapResult = state.map(author => author._id == payload._id ? payload : author);
            localStorage.setItem("authorData" ,JSON.stringify(mapResult));
            return mapResult;
            break;

        case "SEARCH_AUTHOR":
            if(payload === "") {
                state = JSON.parse(localStorage.getItem("authorData"));
                return state;
            }
            const searchResult  = state.filter(author => author.name.toLowerCase().includes(payload.toLowerCase()) ? author : "");
            state = searchResult;
            return state;
            break;

        default:
            return state;
            break;
    }
}