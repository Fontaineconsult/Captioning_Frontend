import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux'
import  logger  from './logger'
import incrementAsync from './task_status_check'


export default applyMiddleware (
    thunk,
    logger,


)