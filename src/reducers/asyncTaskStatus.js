import {RECEIVE_NEW_STATUS, UPDATE_STATUS, REMOVE_STATUS} from "../actions/asyncStatus";






export default function asyncStatusReducer (state={}, action) {
    switch (action.type) {


        case RECEIVE_NEW_STATUS:
            return {
                ...state,
                ...action.status

            };


        case UPDATE_STATUS:

            return state


        case REMOVE_STATUS:

            return state

        default:
            return state
    }



}