import {RECEIVE_INSTRUCTORS} from "../actions/instructors";

export default function instructorsReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_INSTRUCTORS:
            return {
                ...state,
                ...action.instructors


            }


        default:
            return state
    }



}