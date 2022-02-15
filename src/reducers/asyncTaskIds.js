import {RECEIVE_TASK_ID, CLEAR_TASK_ID} from "../actions/asyncTaskIds";
// import {fetchMediaById} from '../actions/ampApi/fetchData'





export default function asyncTaskIdReducer (state=[], action) {

    switch (action.type) {


        case RECEIVE_TASK_ID:

            return [
                ...state,
                {task_id: action.task_id, callback_list: [...action.callback_list]}

            ];


        case CLEAR_TASK_ID:


            return state.filter(a => a.task_id !== action.task_id)


        default:
            return state
    }



}