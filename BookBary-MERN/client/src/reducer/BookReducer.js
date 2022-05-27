const init = { book: "", author: "" };

function saveToLocalStorage(key, initialValue) {
  localStorage.setItem(key, JSON.stringify(initialValue));
}

export default function BookReducer(
  state = JSON.parse(localStorage.getItem("bookdata")) || init,
  { type, payload }
) {
  switch (type) {
    case "GET_BOOK_INIT":
      state = { book: payload.book, author: payload.author };
      saveToLocalStorage("bookdata", state);
      return state;
      break;

    case "POST_BOOK":
      state.book = [...state.book, payload];
      saveToLocalStorage("bookdata", state);
      console.log(state);
      return state;
      break;

    case "DELETE_BOOK":
      const filterResult = state.book.filter((book) =>
        book._id != payload ? book : ""
      );
      state.book = filterResult;
      saveToLocalStorage("bookdata", state);
      return state;
      break;

    case "UPDATE_BOOK":
      state.book.map((book) => (book._id == payload._id ? payload : book));
      saveToLocalStorage("bookdata", state);
      return state;
      break;

    case "SEARCH_BOOK":
      state.book = payload;
      return state;
      break;

    default:
      saveToLocalStorage("bookdata", state);
      state = JSON.parse(localStorage.getItem("bookdata")) || [];
      return state;
      break;
  }
}
