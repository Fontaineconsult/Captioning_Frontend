import {RECEIVE_REQUESTER_RESOURCES, CLEAR_REQUESTER_RESOURCES} from "../actions/requester";

export default function requesterReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_REQUESTER_RESOURCES:
            return {
                ...state,
                ...action.requester

            };

        case CLEAR_REQUESTER_RESOURCES:

            return { }

        default:
            return state
    }



}