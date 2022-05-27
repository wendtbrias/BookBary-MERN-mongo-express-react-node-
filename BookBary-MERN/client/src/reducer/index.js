import { combineReducers } from "redux";
import homeReducer from "./HomeReducer";
import BookReducer from "./BookReducer";
import authorReducer from "./authorReducer";

const allReducer = combineReducers({
    home:homeReducer,
    book:BookReducer,
    author:authorReducer
});

export default allReducer;