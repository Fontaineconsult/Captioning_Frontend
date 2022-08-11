import {CLEAR_SOURCE_URL_DATA, RECEIVE_SOURCE_URL_DATA} from "../actions/searchFilter";

export default function searchFilter(state = {}, action) {
    switch (action.type) {

        case RECEIVE_SOURCE_URL_DATA:
            return {
                ...state,
                ...action.data
            };

        case CLEAR_SOURCE_URL_DATA:
            return {}
        default:
            return state

    }
}