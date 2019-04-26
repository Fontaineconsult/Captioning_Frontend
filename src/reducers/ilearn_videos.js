import {RECEIVE_ILEARN_VIDEOS} from "../actions/ilearn_videos";

export default function IlearnVideoReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_ILEARN_VIDEOS:
            return {
                ...state,
                ...action.IlearnVideos


            };


        default:
            return state
    }



}