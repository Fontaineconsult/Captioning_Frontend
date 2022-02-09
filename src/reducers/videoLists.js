import {RECEIVE_VIDEO_LIST, EMPTY_VIDEO_LIST} from "../actions/videoLists";

export default function videoListsReducer (state={}, action) {

    switch (action.type) {

        case RECEIVE_VIDEO_LIST:
            return {
                ...state,
                ...action.video_list
            };


        case EMPTY_VIDEO_LIST:
            return {}

        default:
            return state
    }



}