import "./styles/tailwind.css";
import ReactDOM from 'react-dom/client';
import allReducer from "./reducer";
import { createStore,applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import App from "./App";

import { BrowserRouter as Router  } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(allReducer ,applyMiddleware(thunk));

root.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>
);