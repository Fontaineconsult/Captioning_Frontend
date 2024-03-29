import {
    ADD_JOB_INFO_TO_TEMP_JOB,
    ADD_JOB_INFO_TO_TEMP_LIST_JOB,
    ADD_MEDIA_TO_TEMP_JOB,
    ADD_MEDIA_TO_TEMP_JOB_NO_ID,
    ADD_VIDEO_TO_TEMP_LIST,
    CLEAR_INCOMPLETE_TEMP_CAP_JOBS,
    CLEAR_TEMP_CAP_JOBS,
    COMPLETE_TEMP_CAP_JOB,
    REMOVE_ITEM_FROM_TEMP_CAP_JOBS,
    START_LIST_TEMP_CAP_JOB,
    START_TEMP_CAP_JOB,
    UPDATE_TEMP_CAP_JOBS_FORM_JOBS,
    UPDATE_TEMP_JOBS_UPLOAD_STATE
} from "../actions/tempJobsForm";


export default function tempJobsFormReducer(state = {}, action) {

    switch (action.type) {

        case START_TEMP_CAP_JOB:
            return {
                ...state,
                [action.temp_id]: {
                    type: "single", video: {}, job_info: {}, meta: {
                        'created': false,
                        transaction_id: action.temp_id,
                        requester_id: action.requester_id,
                        uploaded: false
                    }
                }


            };


        case START_LIST_TEMP_CAP_JOB:
            return {
                ...state,
                [action.temp_id]: {
                    type: "list", video: {}, job_info: {}, meta: {
                        'created': false,
                        transaction_id: action.temp_id,
                        requester_id: action.requester_id,
                        uploaded: false
                    }
                }


            };


        case ADD_VIDEO_TO_TEMP_LIST:
            let key = Object.keys(action.video_info);
            return {
                ...state,
                [action.temp_id]: {
                    video: action.video_info[key],
                    job_info: {...state[action.temp_id].job_info},
                    meta: {...state[action.temp_id].meta}
                }


            }


        case ADD_MEDIA_TO_TEMP_JOB:

            let key_1 = Object.keys(action.media_info);
            return {
                ...state,

                [action.temp_id]: {
                    video: action.media_info[key_1],
                    job_info: {...state[action.temp_id].job_info},
                    meta: {...state[action.temp_id].meta}
                }
            };


        case ADD_MEDIA_TO_TEMP_JOB_NO_ID:

            return {
                ...state,
                [action.temp_id]: {
                    video: action.media_info,
                    job_info: {...state[action.temp_id].job_info},
                    meta: {...state[action.temp_id].meta}
                }
            };


        case ADD_JOB_INFO_TO_TEMP_JOB:

            return {
                ...state,
                [action.temp_id]: {
                    video: {...state[action.temp_id].video},
                    job_info: action.job_info,
                    meta: {...state[action.temp_id].meta}
                }
            };


        case ADD_JOB_INFO_TO_TEMP_LIST_JOB:

            return {
                ...state,
                [action.temp_id]: {
                    video: {...state[action.temp_id].video},
                    job_info: {...state[action.temp_id].job_info, ...action.job_info},
                    meta: {...state[action.temp_id].meta}
                }
            };


        case UPDATE_TEMP_CAP_JOBS_FORM_JOBS:

            return {
                ...state,
                [action.temp_id]: {

                    video: {...state[action.temp_id].video},
                    job_info: {...state[action.temp_id].job_info, [action.job_info.column]: action.job_info.value},
                    meta: {...state[action.temp_id].meta}

                }

            };

        case UPDATE_TEMP_JOBS_UPLOAD_STATE:

            return {
                ...state,
                [action.temp_id]: {
                    video: {...state[action.temp_id].video},
                    job_info: {...state[action.temp_id].job_info},
                    meta: {...state[action.temp_id].meta, uploaded: action.upload_state}

                }

            };

        case REMOVE_ITEM_FROM_TEMP_CAP_JOBS:

            return Object.keys(state).reduce((accumulator, element) => {
                if (element !== action.transaction_id) {
                    accumulator[element] = state[element]
                }
                return accumulator
            }, {});


        case COMPLETE_TEMP_CAP_JOB:

            return {

                ...state,
                [action.temp_id]: {
                    video: {...state[action.temp_id].video},
                    job_info: {...state[action.temp_id].job_info},
                    meta: {...state[action.temp_id].meta, created: action.created}
                }
            };

        case CLEAR_INCOMPLETE_TEMP_CAP_JOBS:

            return Object.keys(state).reduce((accumulator, element) => {
                if (Object.keys(state[element].meta.created) === true) {
                    accumulator[element] = state[element]
                }
                return accumulator
            }, {});


        case CLEAR_TEMP_CAP_JOBS:
            return {};


        default:
            return state
    }

}