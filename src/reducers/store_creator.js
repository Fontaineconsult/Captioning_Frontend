import {compose, createStore} from "redux";
import reducer from "./index";
import middleware from "../middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(middleware));

export default store;