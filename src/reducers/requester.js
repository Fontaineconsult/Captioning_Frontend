import {RECEIVE_REQUESTER_RESOURCES} from "../actions/requester";

export default function requesterReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_REQUESTER_RESOURCES:
            return {
                ...state,
                ...action.requester


            };


        default:
            return state
    }



}