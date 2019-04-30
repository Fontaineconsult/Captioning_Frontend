import {RECEIVE_MEDIA} from "../actions/media";

export default function mediaReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_MEDIA:
            return {
                ...state,
                ...action.media


            };


        default:
            return state
    }



}