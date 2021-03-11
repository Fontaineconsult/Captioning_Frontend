import {RECEIVE_TASK_ID, CLEAR_TASK_ID} from "../actions/asyncTaskIds";






export default function asyncTaskIdReducer (state=[], action) {

    switch (action.type) {


        case RECEIVE_TASK_ID:
            return [
                ...state,
                action.task_id

            ];


        case CLEAR_TASK_ID:
            console.log("CLEAR TASK ID", action.task_id)
            return state.filter(a => a !== action.task_id)


        default:
            return state
    }



}