
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, compose} from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { BrowserRouter, Route, Switch,
    NavLink, } from 'react-router-dom'
import middleware from './middleware'
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(middleware));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <Switch>
                <Route path={"/captioning"}><App/></Route>
                <Route>{<div>PAGE NOT FOUND</div>}</Route>
            </Switch>

        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
