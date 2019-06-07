import {RECEIVE_ILEARN_VIDEOS, UPDATE_ILEARN_VIDEO} from "../actions/ilearn_videos";

export default function IlearnVideoReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_ILEARN_VIDEOS:
            return {
                ...state,
                ...action.IlearnVideos


            };


        case UPDATE_ILEARN_VIDEO:

        return {
            ...state,
            [action.course_gen_id]: {...state[action.course_gen_id], [action.ilearn_video_object.id]: {...state[action.course_gen_id][action.ilearn_video_object.id], [action.ilearn_video_object.column]: action.ilearn_video_object.value}}

        };


        default:
            return state
    }



}