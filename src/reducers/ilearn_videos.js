import {RECEIVE_ILEARN_VIDEOS, UPDATE_ILEARN_VIDEO} from "../actions/ilearn_videos";

export default function IlearnVideoReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_ILEARN_VIDEOS:
            return {
                ...state,
                ...action.IlearnVideos


            };


        case UPDATE_ILEARN_VIDEO:
            console.log(action.ilearn_video_data)
        return {
            ...state,
            // ...action.ilearn_video_data

        };


        default:
            return state
    }



}