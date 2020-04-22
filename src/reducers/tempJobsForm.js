import {START_TEMP_CAP_JOB,
    ADD_MEDIA_TO_TEMP_JOB,
    ADD_JOB_INFO_TO_TEMP_JOB,
    COMPLETE_TEMP_CAP_JOB,
    ADD_MEDIA_TO_TEMP_JOB_NO_ID,
    CLEAR_TEMP_CAP_JOBS,
    UPDATE_TEMP_CAP_JOBS_FORM_JOBS} from "../actions/tempJobsForm";


export default function tempJobsFormReducer (state={}, action) {

    switch (action.type) {

        case START_TEMP_CAP_JOB:
            return {
                ...state,
                [action.temp_id]: {video:{}, job_info:{}, meta:{'created': false, transaction_id: action.temp_id}}

            };

        case ADD_MEDIA_TO_TEMP_JOB:

            let key = Object.keys(action.media_info);
            return {
                ...state,

                [action.temp_id]: {video: action.media_info[key], job_info: {...state[action.temp_id].job_info}, meta:{...state[action.temp_id].meta}}
            };



        case ADD_MEDIA_TO_TEMP_JOB_NO_ID:

            return {
                ...state,

                [action.temp_id]: {video: action.media_info, job_info: {...state[action.temp_id].job_info}, meta:{...state[action.temp_id].meta}}
            };


        case ADD_JOB_INFO_TO_TEMP_JOB:

            return {
                ...state,
                [action.temp_id]: {video: {...state[action.temp_id].video}, job_info: action.job_info,  meta:{...state[action.temp_id].meta}}
            };


        case UPDATE_TEMP_CAP_JOBS_FORM_JOBS:
            console.log("ACTION", action)


            return {
                ...state,
                [action.temp_id]: {

                    video: {...state[action.temp_id].video},
                    job_info: {...state[action.temp_id].job_info, [action.job_info.column]:action.job_info.value},
                    meta: {...state[action.temp_id].meta}

                }

            };



        case COMPLETE_TEMP_CAP_JOB:

            return {

                ...state,
                [action.temp_id]: {
                    video: {...state[action.temp_id].video},
                    job_info: {...state[action.temp_id].job_info},
                    meta: {...state[action.temp_id].meta, created: action.created}


                }


            };

        case CLEAR_TEMP_CAP_JOBS:
            return {};



        default:
            return state
    }

}