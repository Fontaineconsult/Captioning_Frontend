import {RECEIVE_CANVAS_VIDEOS, UPDATE_CANVAS_VIDEO, CLEAR_CANVAS_VIDEO} from "../actions/canvas_videos";

export default function canvasVideoReducer (state={}, action) {

    switch (action.type) {

        case RECEIVE_CANVAS_VIDEOS:
            return {
                ...state,
                ...action.canvasVideos
            };

        case UPDATE_CANVAS_VIDEO:
            return {
                ...state,
                [action.video_id]: {...state[action.video_id], [action.canvas_video_object.column]:action.canvas_video_object.value}

            };

        case CLEAR_CANVAS_VIDEO:
            return { }


        default:
            return state
    }

}
