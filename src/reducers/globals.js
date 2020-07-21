import {SET_GLOBAL_PARAMS, UPDATE_GLOBAL_PARAM} from "../actions/globals";

export default function globalsReducer (state={}, action) {

    switch (action.type) {

        case SET_GLOBAL_PARAMS:
            return {
                ...state,
                ...action.globals
            };


        case UPDATE_GLOBAL_PARAM:
            return {
              ...state,
              [action.param]: action.value

            };


        default:
            return state
    }

}
