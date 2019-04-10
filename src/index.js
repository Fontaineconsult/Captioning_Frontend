
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import middleware from './middleware'


const store = createStore(reducer, middleware);

ReactDOM.render(<Provider store={store}><Router><Route component={App} /></Router></Provider>, document.getElementById('root'));
