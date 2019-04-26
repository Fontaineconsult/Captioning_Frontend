import {RECEIVE_VIDEO_JOBS} from "../actions/video_jobs";

export default function videosJobsReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_VIDEO_JOBS:
            return {
                ...state,
                ...action.videos


            };


        default:
            return state
    }



}