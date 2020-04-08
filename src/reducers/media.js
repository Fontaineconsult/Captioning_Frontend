import {RECEIVE_MEDIA, ADD_MEDIA, ADD_MEDIA_FROM_CAP_JOBS} from "../actions/media";

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

        case ADD_MEDIA_FROM_CAP_JOBS:
            console.log("ADDING MEDIA FROM CAP JO", action.media)
            return {
                ...state,
                ...action.media

            }



        default:
            return state
    }



}