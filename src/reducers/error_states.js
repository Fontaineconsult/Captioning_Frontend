import {SET_ERROR, REMOVE_ERROR} from "../actions/error_state";

const default_state = {"is_error": false, "error_message": ""};

export default function errorsReducer (state=default_state, action) {

    switch (action.type) {

        case SET_ERROR:
            return {
                "is_error": true, "error_message": action.error_message
            };

        case REMOVE_ERROR:
            return {
                default_state
            };
        default:
            return state
    }



}