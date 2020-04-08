import {SET_ERROR, REMOVE_ERROR} from "../actions/error_state";



export default function errorsReducer (state={}, action) {

    switch (action.type) {

        case SET_ERROR:
            return {
                ...state,
                [action.error_id]: {"is_error": true, "error_message": action.error_message, "request_payload": action.request_payload}
            };

        case REMOVE_ERROR:

            return Object.keys(state).reduce((accumulator, element) => {
                if (element !== action.transaction_id) {
                    accumulator[element] = state[element]
                }
                return accumulator
            }, {});


        default:
            return state
    }



}