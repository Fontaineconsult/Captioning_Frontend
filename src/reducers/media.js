import {RECEIVE_MEDIA,
    ADD_MEDIA,
    ADD_MEDIA_FROM_CAP_JOBS,
    ADD_CAP_FILE_TO_MEDIA,
    ADD_MEDIA_FILE_TO_MEDIA,
    UPDATE_MEDIA,
    CLEAR_MEDIA,
    UPDATE_MEDIA_DEEP} from "../actions/media";

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

        case CLEAR_MEDIA:

            return {}


        case ADD_MEDIA_FROM_CAP_JOBS:

            return {
                ...state,
                ...action.media

            }


        case UPDATE_MEDIA:

            return {
                ...state,
                [action.mediaId]:{...action.media[action.mediaId]}

            }

        case UPDATE_MEDIA_DEEP:

            return {
                ...state,
                [action.media_id]: {...state[action.media_id], [action.key]:action.value}

            };


        case ADD_CAP_FILE_TO_MEDIA:


            let newObjectAssignments = Object.keys(action.captionFile).reduce((accumulator, element) => {

                accumulator.push(action.captionFile[element])
                return accumulator
                },[])

            return {
                ...state,
                [action.mediaId]:{...state[action.mediaId], media_objects: newObjectAssignments}

            }

        case ADD_MEDIA_FILE_TO_MEDIA:

            let newMediaObjectAssignments = Object.keys(action.mediaFile).reduce((accumulator, element) => {
                accumulator.push(action.mediaFile[element])
                return accumulator
            },[])

            return {
                ...state,
                [action.mediaId]:{...state[action.mediaId], media_objects: newMediaObjectAssignments}

            }



        default:
            return state
    }



}