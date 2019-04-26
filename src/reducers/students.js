import {RECEIVE_STUDENTS} from "../actions/students";

export default function studentsReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_STUDENTS:
            return {
                ...state,
                ...action.students


            }


        default:
            return state
    }



}