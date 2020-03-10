import {RECEIVE_REQUESTS} from "../actions/requests";

export default function requesterReducer (state={}, action) {

    switch (action.type) {

        case RECEIVE_REQUESTS:
            return {
                ...state,
                ...action.requests
            };

        default:
            return state
    }



}