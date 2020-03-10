import {SET_ERROR, REMOVE_ERROR} from "../actions/error_state";



export default function errorsReducer (state={}, action) {

    switch (action.type) {

        case SET_ERROR:
            return {
                ...state,
                [action.error_id]: {"is_error": true, "error_message": action.error_message}
            };

        case REMOVE_ERROR:
            return {
                ...state
            };
        default:
            return state
    }



}