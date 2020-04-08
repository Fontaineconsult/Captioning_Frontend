import {RECEIVE_MEDIA_SEARCH, CLEAR_MEDIA_SEARCH} from "../actions/mediaSearch";

export default function mediaSearchReducer (state={}, action) {

    switch (action.type) {

        case RECEIVE_MEDIA_SEARCH:
            let key = Object.keys(action.media);
            return {
                ...state,
                [action.unique_id]: action.media[key[0]]
            };


        case CLEAR_MEDIA_SEARCH:
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