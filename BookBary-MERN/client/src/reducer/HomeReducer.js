const initBook = [];
export default function homeReducer(state = JSON.parse(localStorage.getItem('bookHome')) || initBook, { type , payload }) {
   switch(type) {
     case "GET_BOOK":
       state = payload;
       localStorage.setItem("bookHome" ,JSON.stringify(state));
       return state;
       break;

       case "FIND_BOOK":
           if(payload === "") {
               state = JSON.parse(localStorage.getItem("bookHome"));
               return state;
           }
           const filterResult =  state.filter(book => book.title.toLowerCase().includes(payload.toLowerCase()) ? book : "");
           state = filterResult;
           return state;
           break;

     default:
       return state;
       break;
   }
}