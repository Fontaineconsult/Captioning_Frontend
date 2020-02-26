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
                [action.video_id]: {...state[action.video_id], [action.ilearn_video_object.column]:action.ilearn_video_object.value}

            };
        default:
            return state
    }

}
