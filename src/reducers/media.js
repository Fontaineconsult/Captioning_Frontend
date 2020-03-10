import {RECEIVE_MEDIA, ADD_MEDIA} from "../actions/media";

export default function mediaReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_MEDIA:
            return {
                ...state,
                ...action.media


            };

        case ADD_MEDIA:
            return {
                ...state,
                ...action.media

            }

        default:
            return state
    }



}